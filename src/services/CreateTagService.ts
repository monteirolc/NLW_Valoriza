import { getCustomRepository } from "typeorm"
import { TagRepositories } from "../repositories/TagsRepositories"




class CreateTagService{
  async execute(name: string){
    const tagsRepositories = getCustomRepository(TagRepositories);
    if (!name) {
      throw new Error("Incorrect name");
    }

    const tagAlredyExists = await tagsRepositories.findOne({name});

    if (tagAlredyExists) {
      throw new Error("Tag alredy exists");
    }

    const tag = tagsRepositories.create({
      name,
    });

    await tagsRepositories.save(tag);

    return tag
  }
}

export {CreateTagService}