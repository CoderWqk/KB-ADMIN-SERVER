import { Global, Module } from "@nestjs/common";
import { UtilsService } from "./services/utils.service";

// common provider list
const providers = [UtilsService];

@Global()
@Module({
  imports: [],
  providers: [...providers],
  exports: [...providers]
})
export class SharedModule {}