import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { CustomBase } from './base/customBase';
import { Set } from './setModel';
import { User } from './userModel';
import { Question } from './questionModel';

@Entity('record')
export class Record extends BaseEntity {
	@PrimaryColumn()
	id: number;

	@ManyToOne(() => User, user => user.record)
	user: User;

	@ManyToOne(() => Question, question => question.record)
	question: Question;

	@Column({ default: 0 })
	correct: number;

	@Column({ default: 0 })
	inCorrect: number;
}
