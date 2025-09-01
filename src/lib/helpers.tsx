export const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const validatePassword = (password: string) => {
  return password.length >= 6;
};

export const validateCode = (code: string) => {
  const re = /^\d{6}$/; // exactly 6 digits
  return re.test(code);
};

export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner":
      return "bg-green-500";
    case "Intermediate":
      return "bg-yellow-500";
    case "Advanced":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};
export const getDifficultyText = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner":
      return "Beginner";
    case "Intermediate":
      return "Intermediate";
    case "Advanced":
      return "Advanced";
    default:
      return "Unknown";
  }
};

export const getText = (field: any) => {
  if (typeof field === "string") return field;
  if (Array.isArray(field)) {
    return field
      .map((node) => node.children?.map((c: any) => c.text).join(" "))
      .join(" ");
  }
  return "";
};
