import { EnvVariables } from "../enum/envs"

type ProjectEnvVariablesType = Pick<ImportMetaEnv, EnvVariables.VITE_BACKEND_API | EnvVariables.VITE_ENCRYPTION_KEY | EnvVariables.VITE_SESSION_DURATION >


// Environment Variable Template to Be Replaced at Runtime
const projectEnvVariables: ProjectEnvVariablesType = {
  VITE_BACKEND_API: '${VITE_BACKEND_API}',
  VITE_ENCRYPTION_KEY: '${VITE_ENCRYPTION_KEY}',
  VITE_SESSION_DURATION: '${VITE_SESSION_DURATION}',
}


// Returning the variable value from runtime or obtained as a result of the build 
const getEnvVariables = (): {
  envVariables: ProjectEnvVariablesType
} => {
  return {
    envVariables: {
      VITE_BACKEND_API: !projectEnvVariables.VITE_BACKEND_API.includes('VITE_') ? projectEnvVariables.VITE_BACKEND_API : import.meta.env.VITE_BACKEND_API,
      VITE_ENCRYPTION_KEY: !projectEnvVariables.VITE_ENCRYPTION_KEY.includes('VITE_') ? projectEnvVariables.VITE_ENCRYPTION_KEY : import.meta.env.VITE_ENCRYPTION_KEY,
      VITE_SESSION_DURATION: !projectEnvVariables.VITE_SESSION_DURATION.includes('VITE_') ? projectEnvVariables.VITE_SESSION_DURATION : import.meta.env.VITE_SESSION_DURATION,
    }
  }
}

export default getEnvVariables
