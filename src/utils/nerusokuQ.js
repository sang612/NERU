export const getSTT = (id) => {
  const stt = `0${id}`;
  return stt.slice(stt.length - 2, stt.length);
};

export function replaceWithBr(question) {
  return question.replace(/break/g, "<br />");
}

const validateHour = (hour) => {
  if (hour === "") {
    return '';
  }
  if (hour.includes(",") || hour.includes(".") || hour.includes("-")) {
    return '空欄または1-24までの数字で入力してください。';
  }
  return hour >= 1 && hour < 25 ? "" : "空欄または1-24までの数字で入力してください。";
};
const validateDayOfWeek = (value) => {
  if (value === "") {
    return "";
  }
  if (value.includes(",") || value.includes(".") || value.includes("-")) {
    return "飲酒日数は0-7までの数字で入力してください。";
  }
  return value >= 0 && value <= 7 ? "" : "飲酒日数は0-7までの数字で入力してください。";
};

const validateAlcohol = (alcohol) => {
  if (alcohol.includes(",") || alcohol.includes(".") || alcohol.includes("-")) {
    return '酒量は0-20までの数字で入力してください。';
  }
  if (alcohol === "") {
    return '酒量は0-20までの数字で入力してください。';
  }
  return alcohol >= 0 && alcohol <= 20 ? "" : "酒量は0-20までの数字で入力してください。";
};

const validateYears = (years, valueDependencyQuestion, activeValue) => {
  if (valueDependencyQuestion === activeValue) {
    if (years === "") {
      return '';
    }
    if (years.includes(",") || years.includes(".") || years.includes("-")) {
      return '「いいえ」と答えた方のなかで、過去に吸っていて現在禁煙中の場合はその期間をお答えください。';
    }
    return years >= 1 && years <= 70 ? "" : "「いいえ」と答えた方のなかで、過去に吸っていて現在禁煙中の場合はその期間をお答えください。";
  }
  return true;
};

const validateYears22 = (years, valueDependencyQuestion, activeValue) => {
  if (valueDependencyQuestion === activeValue) {
    if (years.includes(",") || years.includes(".") || years.includes("-")) {
      return '1-70までの数字で入力してください。"';
    }
    return years >= 1 && years <= 70 ? "" : "1-70までの数字で入力してください。";
  }
  return true;
};

const validateCigarette = (cigarette, valueDependencyQuestion, activeValue) => {
  if (valueDependencyQuestion === activeValue) {
    if (cigarette.includes(",") || cigarette.includes(".") || cigarette.includes("-")) {
      return '1-80までの数字で入力してください。';
    }
    return cigarette >= 1 && cigarette <= 80 ? "" : "1-80までの数字で入力してください。";
  }
  return true;
};
const validateKG = (kg, valueDependencyQuestion, activeValue) => {
  if (valueDependencyQuestion === activeValue) {
    return kg >= 5 && kg <= 200 ? "" : "5-200までの数字で入力してください。";
  }
  return true;
};

export const validateRadio = () => {};

export const validateOkuchyQ = {
  5: validateHour,
  7: validateDayOfWeek,
  8: validateAlcohol,
  10: validateYears,
  11: validateCigarette,
  21: validateKG,
  26: validateYears22,
};
