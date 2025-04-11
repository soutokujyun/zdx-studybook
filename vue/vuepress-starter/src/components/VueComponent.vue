<template>
<div>
    <h1>VueComponent</h1>
    <p>{{ text }}</p>
    <p>{{ message }}</p>
</div>
</template>
<script>
export default {
    name: 'VueComponent',
    props: {
        text: String,
        default: 'Default text'
    },
    data() {
        return {
            message: 'Hello, Vue!'
        };
    }
};
</script>