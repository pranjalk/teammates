$(document).ready(function() {
    FeedbackPath.attachEvents();
});

var FeedbackPath = {
    attachEvents: function() {
        var allDropdownOptions = $('.feedback-path-dropdown-option');
        FeedbackPath.attachEventsForAllOptions(allDropdownOptions);

        var commonOptions = allDropdownOptions.not(
                '.feedback-path-dropdown-option-other, .feedback-path-dropdown-option-custom');
        FeedbackPath.attachEventsForCommonOptions(commonOptions);

        var otherOption = $('.feedback-path-dropdown-option-other');
        FeedbackPath.attachEventsForOtherOption(otherOption);

        var customPathOption = $('.feedback-path-dropdown-option-custom');
        FeedbackPath.attachEventsForCustomPathOption(customPathOption);
    },

    attachEventsForAllOptions: function(allDropdownOptions) {
        allDropdownOptions.on('click', function(event) {
            var clickedElem = $(event.target);
            var containingForm = FeedbackPath.getContainingForm(clickedElem);

            FeedbackPath.setDropdownText(clickedElem.data('pathDescription'), containingForm);
        });
    },

    attachEventsForCommonOptions: function(commonOptions) {
        commonOptions.on('click', function(event) {
            var clickedElem = $(event.target);
            var containingForm = FeedbackPath.getContainingForm(clickedElem);

            FeedbackPath.updateInputTags(
                    clickedElem.data('giverType'), clickedElem.data('recipientType'), containingForm);
            FeedbackPath.hideOtherOption(containingForm);
        });
    },

    attachEventsForOtherOption: function(otherOption) {
        otherOption.on('click', function(event) {
            var clickedElem = $(event.target);
            var containingForm = FeedbackPath.getContainingForm(clickedElem);

            FeedbackPath.showOtherOption(containingForm);
        });
    },

    attachEventsForCustomPathOption: function(customPathOption) {
        customPathOption.on('click', function(event) {
            var clickedElem = $(event.target);
            var containingForm = FeedbackPath.getContainingForm(clickedElem);

            FeedbackPath.hideOtherOption(containingForm);
        });
    },

    showOtherOption: function(containingForm) {
        containingForm.find('.feedback-path-others').show();
    },

    hideOtherOption: function(containingForm) {
        containingForm.find('.feedback-path-others').hide();
        containingForm.find('[class*= numberOfEntitiesElements]').hide();
    },

    updateInputTags: function(giverType, recipientType, containingForm) {
        containingForm.find('[id^=givertype]').val(giverType);
        containingForm.find('[id^=recipienttype]').val(recipientType);
    },

    setDropdownText: function(text, containingForm) {
        var feedbackPathDropdown = containingForm.find('.feedback-path-dropdown');
        feedbackPathDropdown.find('button').html(text);
    },

    getContainingForm: function(elem) {
        return elem.closest('form');
    }
};

