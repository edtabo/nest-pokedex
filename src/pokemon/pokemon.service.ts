import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';

import { CreatePokemonDto, UpdatePokemonDto } from './dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) { }

  async create(createPokemonDto: CreatePokemonDto) {
    try {
      createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
      const data = await this.pokemonModel.create(createPokemonDto);
      return data;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAll() {
    const data = (await this.pokemonModel.find()).map(item => {
      return {
        id: item.id,
        name: item.name,
        no: item.no
      };
    });
    return data;
  }

  async findOne(term: string) {
    try {
      let data: Pokemon;
      if (!isNaN(+term))
        data = await this.pokemonModel.findOne({ no: term });
      else if (!data && isValidObjectId(term))
        data = await this.pokemonModel.findById(term);

      if (!data)
        data = await this.pokemonModel.findOne({ name: term.toLocaleLowerCase() });

      if (!data)
        throw new BadRequestException(`Pokemon with id, name or no (${term}) not found`);

      return data;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    try {
      const current = await this.findOne(term);

      if (updatePokemonDto.name)
        updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();

      await current.updateOne(updatePokemonDto, { new: true });

      return { ...current.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async remove(id: string) {
    try {
      const data = await this.pokemonModel.deleteOne({
        _id: id
      });
      if (data.deletedCount === 0)
        throw new BadRequestException(`Pokemon with id ${id} not found`);

      return `Pokemon with id ${id} delete sucesfully`;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }


  private handleDBErrors(error: any): never {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`);
    }
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    const msg = error.response.message || "An Error Occurred While Processing Your Request";
    throw new InternalServerErrorException(msg);
  }
}
