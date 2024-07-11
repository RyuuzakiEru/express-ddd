export function Mapper<I, O>(fn: (input: I) => O): (input: I) => O {
  return fn;
}
