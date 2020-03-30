
export class CreatePostDTO {
  readonly title: string;
  readonly description: string;
  readonly body: string;
  readonly author: string;
  readonly date_posted: string;
}

export class QueryType {
  readonly skip: Number;
  readonly limit: Number;
}