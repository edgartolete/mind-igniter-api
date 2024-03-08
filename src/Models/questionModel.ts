import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CustomBase } from './base/customBase';
import { Set } from './setModel';
import { Record } from './recordModel';
import { Module } from './moduleModel';

@Entity('question')
export class Question extends CustomBase {
	@Column({ type: 'text' })
	question: string;

	@Column()
	option1: string;

	@Column()
	option2: string;

	@Column()
	option3: string;

	@Column()
	option4: string;

	@Column()
	answer: string;

	@ManyToOne(() => Set, set => set.question)
	set: Set;

	@OneToMany(() => Record, record => record.question)
	record: Record[];

	@ManyToOne(() => Module, module => module.question)
	module: Module;
}
