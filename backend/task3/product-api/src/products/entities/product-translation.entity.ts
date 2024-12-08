import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductTranslation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    length: 2,
  })
  language: string;

  @ManyToOne(() => Product, (product) => product.translations, {
    onDelete: 'CASCADE',
  })
  @Index()
  product: Product;
}
