import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { EnvConfiguration } from './config/app.config';
import { JoinValidationShema } from './config/joi.config';

@Module({
  imports: [

    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoinValidationShema
    }),

    ServeStaticModule.forRoot({
      rootPath: `${__dirname}/../public`,
    }),

    MongooseModule.forRoot(
      process.env.MONGO_DB
    ),
    PokemonModule,
    CommonModule,
    SeedModule

  ],
})
export class AppModule { }
