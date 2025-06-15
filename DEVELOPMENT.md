# Development

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

```bash
git clone https://github.com/njaga/portfoliov2.git minimal-portfolio
cd minimal-portfolio
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Building for Production

```bash
pnpm build
```

After building, start the application with:

```bash
NODE_ENV=production pnpm start
```

## Registry

This project utilizes **shadcn Registry**, which allows you to manage and distribute custom components, hooks, pages, and other files across multiple React projects. By hosting a registry, you can reuse UI components easily without manually copying code between projects.

### Using Registry in other React projects

If you're working on a different React project and want to reuse the custom components from this repository, you can add them using the **shadcn CLI** with the following commands:

```bash
npx shadcn@latest add https://chanhdai.com/r/utils.json
npx shadcn@latest add https://chanhdai.com/r/theme-switcher.json
npx shadcn@latest add https://chanhdai.com/r/flip-sentences.json
npx shadcn@latest add https://chanhdai.com/r/apple-hello-effect.json
npx shadcn@latest add https://chanhdai.com/r/wheel-picker.json
npx shadcn@latest add https://chanhdai.com/r/use-controllable-state.json
```

> Note: These components are compatible with [Tailwind CSS v4](https://tailwindcss.com/blog/tailwindcss-v4) and [React 19](https://react.dev/blog/2024/12/05/react-19).

### Registry configuration

Documentation: [shadcn Registry Docs](https://ui.shadcn.com/docs/registry)

Source files:

- `./src/registry`

Before using the registry, run the following command to build and generate the registry JSON files:

```bash
pnpm registry:internal:build
pnpm registry:build
```

When running the `npx shadcn@latest add <registry-url>` command, the selected component will be automatically downloaded and integrated into your project.
