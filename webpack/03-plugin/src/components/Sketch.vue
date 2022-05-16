<template>
	<div>
		<h3 class="handle-comp">Sketch</h3>
		<vue-input v-model="column[0].title" placeholder="Title" class="mb-5"></vue-input>
		<vue-input type="textarea" v-model="column[0].desc"></vue-input>
		<vue-input readonly v-model="column[0].image" placeholder="Image"></vue-input>
		<vue-button type="primary" @click="select_article_image()"
			>Upload<i class="vue-icon-upload vue-icon--right"></i
		></vue-button>
	</div>
</template>

<script>
export default {
	props: {
		column: Array
	},
	created () {
		if (this.column.length == 0) {
			this.column.push({
				title: '',
				desc: '',
				image: ''
			});
		}
	},
	methods: {
		select_image() {
			let frame;
			if (frame) {
				frame.open();
				return;
			}
			frame = wp.media();
			frame.open();
			return new Promise((resolve, reject) => {
				frame.on("select", function() {
					const selection = frame.state().get("selection");
					const attachment = selection.first();
					const attachmentUrl = attachment.attributes.url;
					resolve(attachmentUrl);
					frame.close();
				});
			});
		},
		async select_article_image() {
			this.column[0].image = await this.select_image();
		},
	},
};
</script>

<style lang="scss" scoped></style>
