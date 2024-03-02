<?php
/**
 * DeviensPro class.
 *
 * @category   Class
 * @package    ShootingRange
 * @subpackage WordPress
 * @author     
 * @since      1.0.0
 * php version 7.3.9
 */

namespace ShootingRange\Widgets;

use Elementor\Widget_Base;
use Elementor\Controls_Manager;

// Security Note: Blocks direct access to the plugin PHP files.
defined('ABSPATH') || die();

/**
 * shooting-range widget class.
 *
 * @since 1.0.0
 */
class SHOOTING_RANGE_INPUT extends Widget_Base
{
    /**
     * Class constructor.
     *
     * @param array $data Widget data.
     * @param array $args Widget arguments.
     */
    public function __construct($data = array(), $args = null)
    {
        parent::__construct($data, $args);

        #wp_register_style(' shooting-range-styles-vendors', plugins_url('assets/css/2.f87fbcaa.chunk.css', SHOOTING_RANGE));
        #wp_register_style('shooting-range-styles-main', plugins_url('assets/css/main.6fdcdd19.chunk.css', SHOOTING_RANGE));

    }

    public function get_style_depends()
    {
        return []; //[ 'shooting-range-styles-vendors','shooting-range-styles-main' ];
    }

    public function get_script_depends()
    {
        return ['shooting-range-script-vendor',
            'shooting-range-script-main',
            'shooting-range-script-runtime'];
    }

    /**
     * Retrieve the widget name.
     *
     * @return string Widget name.
     * @since 1.0.0
     *
     * @access public
     *
     */
    public function get_name()
    {
        return 'shooting-range-input';
    }

    /**
     * Retrieve the widget title.
     *
     * @return string Widget title.
     * @since 1.0.0
     *
     * @access public
     *
     */
    public function get_title()
    {
        return __('shooting-range-input', 'elementor-shooting-range');
    }

    /**
     * Retrieve the widget icon.
     *
     * @return string Widget icon.
     * @since 1.0.0
     *
     * @access public
     *
     */
    public function get_icon()
    {
        return 'fa';
    }

    /**
     * Retrieve the list of categories the widget belongs to.
     *
     * Used to determine where to display the widget in the editor.
     *
     * Note that currently Elementor supports only one category.
     * When multiple categories passed, Elementor uses the first one.
     *
     * @return array Widget categories.
     * @since 1.0.0
     *
     * @access public
     *
     */
    public function get_categories()
    {
        return array('shooting-range-category');
    }

    /**
     * Register the widget controls.
     *
     * Adds different input fields to allow the user to change and customize the widget settings.
     *
     * @since 1.0.0
     *
     * @access protected
     */
    protected function _register_controls()
    {
        $this->start_controls_section(
            'section_content',
            array(
                'label' => __( 'Content', 'elementor-shooting-range' ),
            )
        );

       

            $this->add_control(
                'placeholder',
                array(
                    'label' => __('placeholder label', 'elementor-shooting-range'),
                    'type' => Controls_Manager::TEXT,
                    'default' => __('My cool placeholder', 'elementor-shooting-range'),
                )
            );
         

            $this->add_control(
                'button',
                array(
                    'label' => __('button label', 'elementor-shooting-range'),
                    'type' => Controls_Manager::TEXT,
                    'default' => __('My cool button', 'elementor-shooting-range'),
                )
            );
         

        $this->end_controls_section();
    }

    /**
     * Render the widget output on the frontend.
     *
     * Written in PHP and used to generate the final HTML.
     *
     * @since 1.0.0
     *
     * @access protected
     */
    protected function render()
    {
        $settings = $this->get_settings_for_display();
        $this->add_render_attribute(
            'shooting-range-input-wrapper',
            [
                 
                     'placeholder' => wp_kses( $settings['placeholder'], array() ),
                 
                     'button' => wp_kses( $settings['button'], array() ),
                 
            ]
        );
        ?>

        <shooting-range-input <?php echo $this->get_render_attribute_string( 'shooting-range-input-wrapper' ); ?>></shooting-range-input>
        <?php
    }

    /**
     * Render the widget output in the editor.
     *
     * Written as a Backbone JavaScript template and used to generate the live preview.
     *
     * @since 1.0.0
     *
     * @access protected
     */
    protected function _content_template()
    {
        ?>
        <#
            view.addRenderAttribute(
                'shooting-range-input-wrapper',
                    {
                      
                           'placeholder': settings.placeholder,
                      
                           'button': settings.button,
                      
                    }

            );
        #>

        <shooting-range-input {{{ view.getRenderAttributeString( 'shooting-range-input-wrapper' ) }}}></shooting-range-input>
        <?php
    }
}
