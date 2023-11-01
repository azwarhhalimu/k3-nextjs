export const StripTags = (page: string): string => {
    return page.replace(/<[^>]*>/g, "");
}