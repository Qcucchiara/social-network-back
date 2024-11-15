import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { config } from "dotenv";

async function bootstrap() {
  config({ path: "./../.env" });
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
