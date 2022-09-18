export default function cls(...args: (string | boolean)[]) {
  return args.filter((arg) => arg).join(' ');
}
