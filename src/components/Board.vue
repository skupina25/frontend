<template>
    <b-container>
        <h1>{{board.title}}</h1>
        <b-row>
            <b-col class="mt-3" md="6" v-for="task in board.tasks" :key="task.id" >
                <b-card class="overflow-hidden">
                    <b-row>
                        <b-col>
                            <div class="float-right" >
                                <b-icon icon="trash" v-on:click="onDeleteIconPressed(task.id)"></b-icon>
                            </div>
                        </b-col>
                    </b-row>
                    <b-row  v-on:click="onTaskClick(task.id)" >
                        <b-col>
                            <b-card-body :title="task.title">
                                <b-card-text>
                                    <div>{{task.description}}</div>
                                    <div>
                                        <b-button v-on:click="changeLifecycleStep(task)" :variant="getLifecycleButtonColor(task)">{{task.lifecycleStep}}</b-button>
                                    </div>
                                </b-card-text>
                            </b-card-body>
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-button class="mt-3" v-on:click="onTaskAddClick()">Add task</b-button>
            </b-col>
        </b-row>
        <div>
            <b-modal
                    id="modal-add-task"
                    ref="modal"
                    title="Add task"
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

                <div>
                    <b-button v-on:click="onAddImageButtonClick()">Add image</b-button>
                </div>
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
        name: "Board",
        data() {
            return {
                board: {},

                title: "",
                titleState: null,

                description: "",
                descriptionState: null,


            }
        },
        created() {
            this.getAllTasks();

        },
        methods: {


            getAllTasks() {
                let url = `http://localhost:8081/api/v1/board/${this.$route.params.id}`;
                console.log(url);
                let _this = this;

                axios
                    .get(url)
                    .then(response => {
                        _this.board = response.data
                        console.log(this.board);
                        _this.board.tasks.sort((a, b) => (a.id > b.id) ? 1 : -1);
                    });


            },

            onTaskClick(id) {
                console.log("yee", id);
                //router.push({path: `/board/${id}`});
            },

            onTaskAddClick() {
                this.$bvModal.show('modal-add-task');
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
                this.title = "";
                this.titleState = null;

                this.description = "";
                this.descriptionState = null;

                this.lifecycleStep = "";
                this.lifecycleStepState =  null;

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


                let url = `http://localhost:8081/api/v1/board/${this.$route.params.id}/task`;

                let newTask = {
                    title: this.title,
                    description: this.description,
                    lifecycleStep: "TO DO",
                };

                let _this = this;

                axios.post(url, newTask)
                    .then(function (response) {
                        console.log(response);
                        _this.getAllTasks();
                    });


                this.$nextTick(() => {
                    this.$bvModal.hide('modal-add-task');
                })

            },

            onDeleteIconPressed(id) {

                let url = `http://localhost:8081/api/v1/task/${id}`;
                let _this = this;

                axios.delete(url)
                    .then(function (response) {
                        console.log(response);
                        _this.getAllTasks();
                    });
            },

            changeLifecycleStep(task) {
                console.log(task);

                if(task.lifecycleStep === "TO DO") {
                    task.lifecycleStep = "IN PROGRESS";
                }
                else if(task.lifecycleStep === "IN PROGRESS") {
                    task.lifecycleStep = "DONE";
                }
                else if(task.lifecycleStep === "DONE") {
                    task.lifecycleStep = "TO DO";
                }

                let _this = this;
                let url = `http://localhost:8081/api/v1/task/${task.id}`;

                axios.post(url, task)
                    .then(function (response) {
                        console.log(response);
                        _this.getAllTasks();
                    });

            },

            getLifecycleButtonColor(task) {

                if(task.lifecycleStep === "TO DO") {
                    return "danger";
                }
                else if(task.lifecycleStep === "IN PROGRESS") {
                    return "secondary";
                }
                else if(task.lifecycleStep === "DONE") {
                    return "success";
                }

            },

            onAddImageButtonClick() {
                router.push({path: `/upload`});
            }

        }
    }
</script>

<style scoped>

</style>