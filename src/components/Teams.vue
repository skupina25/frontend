<template>

    <b-container>
        <b-row>
            <b-col class="mt-3" md="6" v-for="team in teams" :key="team.id" >
                <b-card class="overflow-hidden">
                    <b-row>
                        <b-col>
                            <div class="float-right" >
                                <b-icon icon="trash" ></b-icon>
                            </div>
                        </b-col>
                    </b-row>
                    <b-row >

                        <b-col>
                            <b-card-body :title="team.teamName">
                                <b-card-text>
                                    hhh
                                </b-card-text>
                            </b-card-body>
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
        </b-row>
<!--        <b-row>-->
<!--            <b-col>-->
<!--                <b-button class="mt-3" v-on:click="onBoardAddClick()">Add board</b-button>-->
<!--            </b-col>-->
<!--        </b-row>-->
<!--        <div>-->
<!--            <b-modal-->
<!--                    id="modal-add-board"-->
<!--                    ref="modal"-->
<!--                    title="Add board"-->
<!--                    @show="resetModal"-->
<!--                    @hidden="resetModal"-->
<!--                    @ok="handleOk"-->
<!--            >-->
<!--                <form ref="form" @submit.stop.prevent="handleSubmit">-->
<!--                    <b-form-group-->
<!--                            label="Title"-->
<!--                            label-for="title-input"-->
<!--                            invalid-feedback="Title is required"-->
<!--                            :state="titleState"-->
<!--                    >-->
<!--                        <b-form-input-->
<!--                                id="title-input"-->
<!--                                v-model="title"-->
<!--                                :state="titleState"-->
<!--                                required-->
<!--                        ></b-form-input>-->
<!--                    </b-form-group>-->
<!--                    <b-form-group-->
<!--                            label="Description"-->
<!--                            label-for="description-input"-->
<!--                            invalid-feedback="Description is required"-->
<!--                            :state="descriptionState"-->
<!--                    >-->
<!--                        <b-form-input-->
<!--                                id="description-input"-->
<!--                                v-model="description"-->
<!--                                :state="descriptionState"-->
<!--                                required-->
<!--                        ></b-form-input>-->
<!--                    </b-form-group>-->
<!--                </form>-->
<!--            </b-modal>-->
<!--        </div>-->
    </b-container>
</template>

<script>
    import axios from "axios";
    //import router from "../router";

    export default {
        name: "Teams",
        data() {
            return {
                teams: [],

            }
        },
        created() {
            this.getAllBoards();
        },
        methods: {

            getAllBoards() {

                let _this = this;
                let url = 'http://34.120.64.253/api/v1/team';

                axios
                    .get(url)
                    .then(response => {
                        _this.teams = response.data;
                        console.log(_this.teams);
                        _this.teams.sort((a, b) => (a.id > b.id) ? 1 : -1);
                    });
            },

        }
    }
</script>

<style scoped>

</style>