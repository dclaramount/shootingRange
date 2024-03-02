<?php
class booking_widget extends \Elementor\Widget_Base {

    public function get_name() {
        return 'hello_world_widget_2';
    }

    public function get_title() {
        return esc_html__( 'Hello World 3', 'elementor-addon' );
    }

    public function get_icon() {
        return 'eicon-code';
    }

    public function get_categories() {
        return [ 'basic' ];
    }

    public function get_keywords() {
        return [ 'hello', 'world' ];
    }

    protected function render() {
        ?>

        <?php
        include './booking-widget-extras/classes/test.php';

        $testObject = new test();

        //echo $testObject->show();

        ?>
        <p>Diegoooooo</p>

        <?php
    }
}