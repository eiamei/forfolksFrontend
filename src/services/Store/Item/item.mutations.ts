export const itemMutations = {
    data (state, data) {
        state.data = Object.assign({}, data);
    },
    images (state, images) {
        state.images = images.slice();
    }
}