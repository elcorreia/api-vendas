import handlebars from 'handlebars';

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  template: string;
  variables: ITemplateVariable;
}

export default class HandleBarsMailTemplate {
  public async parse({
    template,
    variables,
  }: IParseMailTemplate): Promisse<string> {
    const parseTemplate = handlebars.compile(template);

    return parseTemplate(variables);
  }
}
