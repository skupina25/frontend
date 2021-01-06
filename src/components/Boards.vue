<template>
    <b-container>
        <b-row>
            <b-col class="mt-3" md="6" v-for="board in boards" :key="board.id" >
                <b-card class="overflow-hidden">
                    <b-row>
                        <b-col>
                            <div class="float-right" >
                                <b-icon icon="trash" v-on:click="onDeleteIconPressed(board.id)"></b-icon>
                            </div>
                        </b-col>
                    </b-row>
                    <b-row  v-on:click="onBoardClick(board.id)">

                        <b-col>
                            <b-card-body :title="board.title">
                                <b-card-text>
                                    {{board.description}}
                                </b-card-text>
                            </b-card-body>
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-button class="mt-3" v-on:click="onBoardAddClick()">Add board</b-button>
            </b-col>
        </b-row>
        <div>
            <b-modal
                    id="modal-add-board"
                    ref="modal"
                    title="Add board"
                    @show="resetModal"
                    @hidden="resetModal"
                    @ok="handleOk"
            >
                <form ref="form" @submit.stop.prevent="handleSubmit">
                    <b-form-group
                        label="Title"
                        label-for="title-input"
                        invalid-feedback="Title is required"
                        :state="titleState"
                    >
                        <b-form-input
                                id="title-input"
                                v-model="title"
                                :state="titleState"
                                required
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                            label="Description"
                            label-for="description-input"
                            invalid-feedback="Description is required"
                            :state="descriptionState"
                    >
                        <b-form-input
                                id="description-input"
                                v-model="description"
                                :state="descriptionState"
                                required
                        ></b-form-input>
                    </b-form-group>
                </form>
            </b-modal>
        </div>
    </b-container>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import axios from "axios";
    import router from "../router";

    export default {
        name: "Boards",
        data() {
            return {
                boards: [],

                title: "",
                titleState: null,

                description: "",
                descriptionState: null,


            }
        },
        created() {
            this.getAllBoards();
        },
        methods: {

            getAllBoards() {

                let _this = this;
                let url = 'http://34.120.64.253/api/v1/board';

                axios
                    .get(url)
                    .then(response => {
                        _this.boards = response.data;
                        _this.boards.sort((a, b) => (a.id > b.id) ? 1 : -1);
                    });
            },

            onBoardClick(id) {
                console.log("yee", id);
                router.push({path: `/board/${id}`});
            },

            onBoardAddClick() {
                this.$bvModal.show('modal-add-board');
            },

            checkFormValidity() {
                let valid = true;

                if(this.title === "") {
                    this.titleState=false;
                    valid = false;
                }
                else {
                    this.titleState = true;
                }

                if(this.description === "") {
                    this.descriptionState=false;
                    valid = false;
                }
                else {
                    this.descriptionState = true;
                }

                return valid;
            },

            resetModal() {
                this.title = '';
                this.titleState = null;

                this.description = '';
                this.descriptionState = null;

            },

            handleOk(bvModalEvt) {
                // Prevent modal from closing
                bvModalEvt.preventDefault();
                // Trigger submit handler
                this.handleSubmit();
            },
            handleSubmit() {
                // Exit when the form isn't valid
                if (!this.checkFormValidity()) {
                    return;
                }

                let url = 'http://34.120.64.253/api/v1/board';

                let newBoard = {
                    title: this.title,
                    description: this.description,
                    teamId: 1,
                };

                let _this = this;

                axios.post(url, newBoard)
                    .then(function (response) {
                        console.log(response);
                        _this.getAllBoards();
                    });

                this.$nextTick(() => {
                    this.$bvModal.hide('modal-add-board');
                })

            },

            onDeleteIconPressed(id) {

                let url = `http://34.120.64.253/api/v1/board/${id}`;
                let _this = this;

                axios.delete(url)
                    .then(function (response) {
                        console.log(response);
                        _this.getAllBoards();
                });
            }

        }
    }
</script>

<style scoped>

</style>