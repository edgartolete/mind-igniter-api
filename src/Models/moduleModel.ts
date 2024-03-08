import { Column, Entity, OneToMany } from 'typeorm';
import { CustomBase } from './base/customBase';
import { Set } from './setModel';
import { Question } from './questionModel';

@Entity('module')
export class Module extends CustomBase {
	@Column({ unique: true })
	name: string;

	@Column()
	description: string;

	@Column({ unique: true })
	code: string;

	@Column({ nullable: false })
	passCode: string;

	@OneToMany(() => Set, set => set.module)
	set: Set[];

	@OneToMany(() => Question, question => question.module)
	question: Question[];
}
