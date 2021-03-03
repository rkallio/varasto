export default If = ({ cond, children }) => {
    if (cond) {
        return children;
    } else {
        return null;
    }
};
