import { Module } from '@nestjs/common';
import { GenerateService } from './services/generate.service';

@Module({
    providers: [GenerateService],
    exports: [GenerateService],
})
export class UtilsModule {}
