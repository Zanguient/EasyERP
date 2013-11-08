﻿define([
        'text!templates/Applications/kanban/WorkflowsTemplate.html',
        'collections/Workflows/WorkflowsCollection',
        'views/Applications/kanban/KanbanItemView',
        'views/Applications/EditView',
        'views/Applications/CreateView'
],
function (WorkflowsTemplate, WorkflowsCollection, KanbanItemView, EditView, CreateView) {
    var ApplicationKanbanView = Backbone.View.extend({
        el: '#content-holder',
        events: {
            "click #showMore": "showMore",
            "dblclick .application-header, .application-content": "gotoEditForm",
            "click .application-header, .application-content": "selectItem"
        },
        initialize: function (options) {
            this.workflowsCollection = new WorkflowsCollection({ id: 'Application' });
            this.workflowsCollection.bind('reset', this.render, this);
            this.collection = options.collection;
        },

        selectItem: function (e) {
            $(e.target).parents(".item").parent().find(".active").removeClass("active");
            $(e.target).parents(".item").addClass("active");
        },

        gotoEditForm: function (e) {
            e.preventDefault();
            var id = $(e.target).closest(".item").data("id");
            var model = this.collection.getElement(id);
            new EditView({ model: model, collection: this.collection });
        },
        
        filterByWorkflow: function (models, id) {
            return _.filter(models, function (data) {
                return data.attributes["workflow"]._id == id;
            });
        },

        showMore: function () {
            _.bind(this.collection.showMore, this.collection);
            this.collection.showMore();
        },

        showMoreContent: function (newModels) {
            var workflows = this.workflowsCollection.toJSON();
            $(".column").last().addClass("lastColumn");
            _.each(workflows, function (workflow, i) {
                var counter = 0,
                remaining = 0;
                var column = this.$(".column").eq(i);
                var kanbanItemView;
                var modelByWorkflows = this.filterByWorkflow(newModels.models, workflow._id);
                _.each(modelByWorkflows, function (wfModel) {
                    kanbanItemView = new KanbanItemView({ model: wfModel });
                    column.append(kanbanItemView.render().el);
                    counter++;
                    remaining += wfModel.get("remaining");
                }, this);
                column.find(".counter").html(parseInt(column.find(".counter").html()) + counter);
                column.find(".remaining span").html(parseInt(column.find(".remaining span").html()) + remaining);
            }, this);
        },

        editItem: function () {
            //create editView in dialog here
            new EditView({ collection: this.collection });
        },

        createItem: function () {
            //create editView in dialog here
            new CreateView();
        },

        render: function () {
            var workflows = this.workflowsCollection.toJSON();
            this.$el.html(_.template(WorkflowsTemplate, { workflowsCollection: workflows }));
            var models = this.collection.models;
            $(".column").last().addClass("lastColumn");
            _.each(workflows, function (workflow, i) {
                var counter = 0,
                remaining = 0;
                var column = this.$(".column").eq(i);
                var kanbanItemView;
                var modelByWorkflows = this.filterByWorkflow(models, workflow._id);
                _.each(modelByWorkflows, function (wfModel) {
                    kanbanItemView = new KanbanItemView({ model: wfModel });
                    column.append(kanbanItemView.render().el);
                    counter++;
                    remaining += wfModel.get("remaining");

                }, this);
                var count = " <span>(<span class='counter'>" + counter + "</span>)</span>";
                var content = "<p class='remaining'>Remaining time: <span>" + remaining + "</span></p>";
                column.find(".columnNameDiv h2").append(count);
                column.find(".columnNameDiv").append(content);
            }, this);
            this.$el.append('<div id="showMoreDiv"><input type="button" id="showMore" value="Show More"/></div>');
            var that = this;
            this.$(".column").sortable({
                connectWith: ".column",
                cancel: "h2",
                cursor: "move",
                items: ".item",
                opacity: 0.7,
                revert: true,
                helper: 'clone',
                start: function (event, ui) {
                    var column = ui.item.closest(".column");
                    var id = ui.item.attr('data-id');
                    var model = that.collection.get(id);
                    if (model) {
                        column.find(".counter").html(parseInt(column.find(".counter").html()) - 1);
                        column.find(".remaining span").html(parseInt(column.find(".remaining span").html()) - (model.get("estimated") - model.get("logged")));
                    }

                },
                stop: function (event, ui) {
                    var id = ui.item.attr('data-id');
                    var model = that.collection.get(id);
                    var column = ui.item.closest(".column");
                    if (model) {
                        model.set({ workflow: column.data('id') });
                        model.save({}, {
                            //headers: {
                            //    mid: mid
                            //}
                        });
                        column.find(".counter").html(parseInt(column.find(".counter").html()) + 1);
                        column.find(".remaining span").html(parseInt(column.find(".remaining span").html()) + (model.get("estimated") - model.get("logged")));
                    }
                }
            }).disableSelection();
            return this;
        }
    });

    return ApplicationKanbanView;
});