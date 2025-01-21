import { user } from "@prisma/client";

const OmitSensitiveData = (obj: user | user[], keys: (keyof user)[]): void => {
  if (Array.isArray(obj)) {
    obj.forEach((item) => {
      keys.forEach((key) => {
        delete item[key];
      });
    });
  } else {
    keys.forEach((key) => {
      delete obj[key];
    });
  }
}

export default OmitSensitiveData;
