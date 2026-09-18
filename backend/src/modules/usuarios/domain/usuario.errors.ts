export class EmailYaRegistradoError extends Error {
  constructor(public readonly email: string) {
    super(`Ya existe un usuario registrado con el email ${email}`);
    this.name = 'EmailYaRegistradoError';
  }
}
