import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {



  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter
  ) { }

  async executeSeed() {
    try {

      const data = await this.http.get<PokeResponse>("https://pokeapi.co/api/v2/pokemon?limit=600");

      if (data) {
        await this.pokemonModel.deleteMany({});

        const elements = data.results.map(element => {
          const segments = element.url.split('/');
          const no: number = Number(segments[segments.length - 2]);
          return {
            name: element.name,
            no: no
          };
        });

        const pokemons = data.results.map((item, index) => {
          this.pokemonModel.create({
            name: item.name,
            no: index + 1
          });
        });

        const status = await Promise.all(pokemons);
        if (!status)
          throw new BadRequestException('Failed to execute seed');

        return 'Seed executed successfully';

        return data;
      }
      else
        throw new BadRequestException('Failed to get api data');

    } catch (error) {
      throw new InternalServerErrorException(error.response.message || "An Error Occurred While Processing Your Request");
    }

  }
}
