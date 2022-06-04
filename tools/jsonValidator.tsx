const isJsonString = (str: string) => {
    try {
        JSON.parse(JSON.stringify(str))
        eval(str)
    } catch (e) {
        return false;
    }
    return true;
}

export default isJsonString