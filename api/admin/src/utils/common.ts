export const convertTitleIntoSlug = (title: string): string => {
  return title
            .toLowerCase()
            .replace(/\s/g, '-')
            .replace(/[^a-z0-9-]/g, '')
            .replace(/-+/g, '-');      // remove multiple -
};
