/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Jonathan Rass (jonathan_rass)

   ======================================================================

   This class contains code based on the following work:

   * script.aculo.us
       http://script.aculo.us/
       Version 1.8.1

     Copyright:
       (c) 2008 Thomas Fuchs

     License:
       MIT: http://www.opensource.org/licenses/mit-license.php

     Author:
       Thomas Fuchs

************************************************************************ */

/**
 * Combination effect "Switch Off"
 *
 * The given element will flicker one time and then
 * fold in.
 */

qx.Class.define("qx.fx.effect.combination.SwitchOff",
{

  extend : qx.fx.Base,

  /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
  */

  /**
   * @param element {Object} The DOM element
   */
  construct : function(element)
  {
    this.base(arguments, element);
    this.setTransition(qx.fx.Transition.flicker);

    var scaleEffect = this._scaleEffect = new qx.fx.effect.core.Scale(this._element);

    this._scaleEffect.beforeSetup = function() {
      qx.bom.element.Style.set(this._element, "overflow", "hidden");
    };

    this._appearEffect = new qx.fx.effect.core.Fade(this._element);
    this._appearEffect.afterFinishInternal = function() {
      scaleEffect.start();
    };

    this._scaleEffect.set({
      scaleTo            : 1.0,
      duration           : 0.3,
      scaleFromCenter    : true,
      scaleX             : false,
      scaleContent       : false,
      restoreAfterFinish : true
    });

    this._appearEffect.set({
      duration : this.getDuration(),
      from : this.getFrom(),
      to : 1
    });

  },


  /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */

  properties :
  {

    /**
    * Number of seconds the effect should run.
    */
    duration :
    {
      init : 0.4,
      refine : true
    },

    /**
     * Initial opacity value
     */
    from :
    {
      init : 0.0,
      refine : true
    },

    /**
     * Flag indicating if the CSS attribute "display"
     * should be modified by effect
     */
    modifyDisplay :
    {
      init : true,
      check : "Boolean"
    }

  },


  /*
   *****************************************************************************
      MEMBERS
   *****************************************************************************
   */

  members :
  {

    setup : function()
    {
      this.base(arguments);

      this._oldOverflow = qx.bom.element.Style.get(this._element, "overflow");

      this._scaleEffect.afterFinishInternal = function()
      {
        qx.bom.element.Style.set(this._element, "overflow", this._oldOverflow);
      };

    },

    afterFinish : function()
    {
      if (this.getModifyDisplay()) {
        qx.bom.element.Style.set(this._element, "display", "none");
      }
    },

    start : function()
    {
      this.base(arguments);
      this._appearEffect.start();
    }

  },


   /*
   *****************************************************************************
      DESTRUCTOR
   *****************************************************************************
   */

  destruct : function()
  {
    this._disposeObjects("_appearEffect", "_scaleEffect");
  }

});
