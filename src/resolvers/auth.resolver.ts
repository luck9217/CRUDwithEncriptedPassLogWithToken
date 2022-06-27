import { hash } from "bcryptjs";
import { IsEmail, Length } from "class-validator";
import { Arg, Field, InputType, Mutation, Resolver } from "type-graphql";
import { User } from "../entity/user.entity";

@InputType()
class UserInput {
  @Field()
  @Length(3, 64)
  fullName!: string;

  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @Length(8, 254)
  password!: string;
}

@Resolver()
export class AuthResolver {
  @Mutation(() => User)
  async register(@Arg("input", () => UserInput) input: UserInput)
   {
    const { fullName, email, password } = input;

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      const error = new Error();
      error.message = "Email is not available";
      throw error;
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await User.insert({
      fullName,
      email,
      password: hashedPassword,
    });

    //const result = User.findOneBy(newUser.identifiers[0].id);
    const result = await User.findOneBy({ id: newUser.identifiers[0].id });
    console.log(result);
    console.log(newUser);
    console.log( newUser.identifiers[0].id);

    return result;
  }
}
