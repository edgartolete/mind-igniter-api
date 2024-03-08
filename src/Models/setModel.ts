import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CustomBase } from './base/customBase';
import { Module } from './moduleModel';
import { Question } from './questionModel';

@Entity('set')
export class Set extends CustomBase {
	@Column()
	name: string;

	@Column()
	description: string;

	@ManyToOne(() => Module, module => module.set)
	module: Module;

	@OneToMany(() => Question, question => question.set)
	question: Question[];
}
