import { Entity, Column } from 'typeorm';

import { Base } from './base/Base';

@Entity()
export class Countries extends Base {
  @Column({ nullable: false, type: 'varchar' })
  descri: string;
}
