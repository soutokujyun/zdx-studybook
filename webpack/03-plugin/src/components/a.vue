<script>
export default {
	props: {
		num: Number, 
		image: String,
		obj: Object,
		isShow: Boolean,
		text: {
			require: true,
			type: String
		},
		content: {
			type: Number,
			default: 200
		},
		obj2: {
			type: Object,
			default: {
				a: '',
				b: ''
			}
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
		async select_banner() {
			this.image = await this.select_image();
		},
	},
};
</script>
