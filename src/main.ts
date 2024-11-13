import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { config } from "dotenv";
import path from "path";

async function bootstrap() {
  let test = config({ path: "./../.env" });
  console.log({ test });
  console.log(process.env.POSTGRES_URL);
  console.log(process.env.MONGO_URL);
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.setGlobalPrefix("api");
  await app.listen(parseInt(process.env.BACKEND_PORT));
}
bootstrap();
