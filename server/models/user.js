import { Schema, model } from 'mongoose'
import { hashSync, genSaltSync, compareSync } from 'bcrypt'

const emailRe = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// Creating user schema
const userSchema = new Schema({
	first_name: {
		type: String,
		maxlength: [32, 'tooLong'],
		minlength: [3, 'tooShort'],
		match: [/^[a-zA-Z0-9]+$/, 'First name is incorrect'],
		required: [true, 'First name is required']
	},
	last_name: {
		type: String,
		match: [/^[a-z0-9]+$/, 'Last name is incorrect']
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		match: [emailRe, 'Email is incorrect'],
		unique: true
	},
	phone: {
		type: String
	},
	password: {
		type: String,
		minlength: [5, 'tooShort'],
		required: [true, 'Password Required']
	}
})

// Hashing password
userSchema.methods.setPassword = password => (
	hashSync(password, genSaltSync(10))
)

userSchema.methods.comparePassword = (password, hash) => (
	compareSync(password, hash)
)

export default model('User', userSchema)
