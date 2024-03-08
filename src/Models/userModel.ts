import { Entity, Column, AfterLoad, Unique, OneToMany } from 'typeorm';
import { CustomBase } from './base/customBase';
import { Record } from './recordModel';

enum Gender {
	Male = 'male',
	Female = 'female'
}
@Entity('users')
export class User extends CustomBase {
	@Column({ nullable: false, unique: true })
	username: string;

	@Column({ nullable: false, unique: true })
	email: string;

	@Column({ nullable: false })
	password: string;

	@Column({ nullable: true })
	firstName: string;

	@Column({ nullable: true })
	lastName: string;

	@Column({ nullable: true })
	middleName: string;

	fullName: string;
	@AfterLoad()
	setName() {
		this.fullName = `${this.firstName} ${this.middleName + ' '}${this.lastName}`;
	}

	@Column({ nullable: true })
	recoveryQuestion1: string;

	@Column({ nullable: true })
	recoveryAnswer1: string;

	@Column({ nullable: true })
	recoveryQuestion2: string;

	@Column({ nullable: true })
	recoveryAnswer2: string;

	@Column({ nullable: true })
	recoveryQuestion3: string;

	@Column({ nullable: true })
	recoveryAnswer3: string;

	@Column({ nullable: true })
	photo: string;

	@Column({ type: 'date', nullable: true })
	birthday: string;

	@Column({ type: 'enum', enum: Gender, nullable: true })
	gender: Gender;

	@OneToMany(() => Record, record => record.user)
	record: Record[];
}
