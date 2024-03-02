<?php
#[AllowDynamicProperties]
class test
{

    /**
     * Constructor
     */
    public function __construct()
    {
        //$this->currentURL = htmlentities($_SERVER['REQUEST_URI']);
        //$this->naviHref = htmlentities($_SERVER['PHP_SELF']);
    }
    public function show()
    {
        $content = '<div class="test">'.
                        "Diego Custom".
                    '</div>';

        return $content;
    }
}
?>

