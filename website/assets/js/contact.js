(function($) {
    const $name = $('#name');
    const $email = $('#email');
    const $message = $('#message');
    const $submit = $('input[type="submit"]');

    function getOutput() {
        return `Form data: "${$name.val()}" "${$email.val()}" "${$message.val()}"`;
    }

    $submit.on('click', (e) => {
        e.preventDefault();
        window.alert(getOutput());
    });
})(jQuery);
