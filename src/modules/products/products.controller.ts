import { 
  Controller, 
  Get, 
  Post, 
  Patch, 
  Delete, 
  Param, 
  Query, 
  Body, 
  UseGuards, 
  ParseIntPipe 
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { queryProductsSchema } from './dto/query-products.dto';
import { AdminGuard } from '../../common/guards/admin.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(@Query() query: Record<string, string>) {
    const { includeInactive, ...filters } = query;
    const dto = queryProductsSchema.parse(filters);
    return this.productsService.findAll(dto, includeInactive === 'true');
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Post()
  @UseGuards(AdminGuard)
  async create(@Body() data: any) {
    return this.productsService.create(data);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.productsService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.delete(id);
  }
}
