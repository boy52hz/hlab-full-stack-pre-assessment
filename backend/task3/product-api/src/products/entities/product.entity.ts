import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductTranslation } from './product-translation.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  sku: string;

  @OneToMany(() => ProductTranslation, (translation) => translation.product, {
    cascade: ['insert', 'remove'],
  })
  translations: ProductTranslation[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
