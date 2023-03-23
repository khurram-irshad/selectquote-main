import { Direction } from '@common/enums/direction';
import { ScreenMode } from '@common/enums/Mode';
import stringify from 'fast-safe-stringify';


export const parsePage = (page: unknown): any => {
  // Kill circular references
  return JSON.parse(stringify(page)) as any;
};

export const findCopy = (sections: any[], field: string) => {
  const data = sections?.find(x => x.fields.id === field);
  return data ? data?.fields?.singleCopy : null;
}

export const unmaskMobile = (value: string) => {
  return value.replaceAll(' ', '').replace('(', '').replace(')', '').replaceAll('_', '')
}
export const insertAt = (str: string, index: number, value: any) => {
  return str.slice(0, index) + value + str.slice(index);
}
export const maskMobile = (mobile: string) => {
  if (!mobile || mobile.length < 10) return;
  var v1 = insertAt(mobile, 0, '(')
  var v2 = insertAt(v1, 4, ')')
  var v3 = insertAt(v2, 5, ' ')
  var v4 = insertAt(v3, 9, '-')
  return v4;
}

export const replaceAt = (string, index, valueToReplace) => {
  return string.substring(0, index) + valueToReplace + string.substring(index + 1)
}

export const isMobile = (screenWidth: ScreenMode) => {
  return screenWidth === ScreenMode.Mobile
}
export const isDesktop = (screenMode: ScreenMode) => {
  return screenMode === ScreenMode.Desktop
}

export const isValidHttpUrl = (string) => {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
};

export const generateSessionId = () => {
  var d = new Date().getTime();
  var sessionID = "xxxxxx-xxxx-xxxxxx".replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return sessionID;
};

export const getDirection = (direction) => {
  switch (direction) {
    case Direction.Vertical:
      return 'flex-column'
    case Direction.VerticalReverse:
      return 'flex-column-reverse'
    case Direction.Horizontal:
      return 'flex-row'
    case Direction.HorizontalReverse:
      return 'flex-row-reverse'
  }
}