# CI/CD Overview

## Common CI Steps

### For JavaScript/TypeScript

1. **Linting** - check the style and potential issues/bugs  
   Tools: ESLint, Prettier (code formatter)

2. **Testing** - unit, component, e2e tests  
   Tools: Jest / React Testing Library (unit, component, integration tests), Cypress or Playwright (e2e tests)

3. **Building**  
   Tools: Webpack / Vite / Parcel (frontend build), npm run build / yarn build (build scripts)

### For Python

1. **Linting** - check for mistakes and typos  
   Tools: Flake8, Black (code formatter)

2. **Testing** - unit and integration tests  
   Tools: pytest, unittest (standard library), tox

3. **Building / Packaging**  
   Tools: setuptools / wheel, poetry (package management)

---

## Alternatives to Jenkins & GitHub Actions

- GitLab CI/CD
- CircleCI
- Travis CI
- Bitbucket Pipelines
- Azure DevOps Pipelines
- TeamCity
- Drone CI
- GoCD

---

## Self-hosted vs Cloud-based

**Cloud-based CI/CD** runs on servers managed by someone else (like GitHub Actions or GitLab CI).

- Easy to set up
- No need to maintain servers
- Can scale automatically
- But you have limited control and need to trust the provider with your code

**Self-hosted CI/CD** runs on your own servers.

- Full control over everything
- Can handle sensitive data safely
- No limits on resources
- But you have to set up and maintain the servers yourself, which takes time and skills

**How to decide:**

- Use cloud if you want simplicity and fast setup
- Use self-hosted if security, control, or unlimited resources are important
