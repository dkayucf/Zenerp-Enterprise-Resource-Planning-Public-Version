module.exports = {
    escapeRegExp: (string) => {
        return string.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }
}