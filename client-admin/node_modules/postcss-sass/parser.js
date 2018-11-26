'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var postcss = require('postcss');
var gonzales = require('gonzales-pe');

var DEFAULT_RAWS_ROOT = {
  before: ''
};

var DEFAULT_RAWS_RULE = {
  before: '',
  between: ''
};

var DEFAULT_RAWS_DECL = {
  before: '',
  between: '',
  semicolon: false
};

var DEFAULT_COMMENT_DECL = {
  before: '',
  left: '',
  right: ''
};

var SassParser = function () {
  function SassParser(input) {
    _classCallCheck(this, SassParser);

    this.input = input;
  }

  SassParser.prototype.parse = function parse() {
    try {
      this.node = gonzales.parse(this.input.css, { syntax: 'sass' });
    } catch (error) {
      throw this.input.error(error.message, error.line, 1);
    }
    this.lines = this.input.css.match(/^.*(\r?\n|$)/gm);
    this.root = this.stylesheet(this.node);
  };

  SassParser.prototype.extractSource = function extractSource(start, end) {
    var nodeLines = this.lines.slice(start.line - 1, end.line);

    nodeLines[0] = nodeLines[0].substring(start.column - 1);
    var last = nodeLines.length - 1;
    nodeLines[last] = nodeLines[last].substring(0, end.column);

    return nodeLines.join('');
  };

  SassParser.prototype.stylesheet = function stylesheet(node) {
    var _this = this;

    // Create and set parameters for Root node
    var root = postcss.root();
    root.source = {
      start: node.start,
      end: node.end,
      input: this.input
      // Raws for root node
    };root.raws = {
      semicolon: DEFAULT_RAWS_ROOT.semicolon,
      before: DEFAULT_RAWS_ROOT.before
      // Store spaces before root (if exist)
    };this.raws = {
      before: ''
    };
    node.content.forEach(function (contentNode) {
      return _this.process(contentNode, root);
    });
    return root;
  };

  SassParser.prototype.process = function process(node, parent) {
    if (this[node.type]) {
      return this[node.type](node, parent) || null;
    } else {
      return null;
    }
  };

  SassParser.prototype.ruleset = function ruleset(node, parent) {
    var _this2 = this;

    // Loop to find the deepest ruleset node
    this.raws.multiRuleProp = '';

    node.content.forEach(function (contentNode) {
      switch (contentNode.type) {
        case 'block':
          {
            // Create Rule node
            var rule = postcss.rule();
            rule.selector = '';
            // Object to store raws for Rule
            var ruleRaws = {
              before: _this2.raws.before || DEFAULT_RAWS_RULE.before,
              between: DEFAULT_RAWS_RULE.between

              // Variable to store spaces and symbols before declaration property
            };_this2.raws.before = '';
            _this2.raws.comment = false;

            // Look up throw all nodes in current ruleset node
            node.content.filter(function (content) {
              return content.type === 'block';
            }).forEach(function (innerContentNode) {
              return _this2.process(innerContentNode, rule);
            });

            if (rule.nodes.length) {
              // Write selector to Rule
              rule.selector = _this2.extractSource(node.start, contentNode.start).slice(0, -1).replace(/\s+$/, function (spaces) {
                ruleRaws.between = spaces;
                return '';
              });
              // Set parameters for Rule node
              rule.parent = parent;
              rule.source = {
                start: node.start,
                end: node.end,
                input: _this2.input
              };
              rule.raws = ruleRaws;
              parent.nodes.push(rule);
            }
            break;
          }
        default:
      }
    });
  };

  SassParser.prototype.block = function block(node, parent) {
    var _this3 = this;

    // If nested rules exist, wrap current rule in new rule node
    if (this.raws.multiRule) {
      if (this.raws.multiRulePropVariable) {
        this.raws.multiRuleProp = '$' + this.raws.multiRuleProp;
      }
      var multiRule = Object.assign(postcss.rule(), {
        source: {
          start: {
            line: node.start.line - 1,
            column: node.start.column
          },
          end: node.end,
          input: this.input
        },
        raws: {
          before: this.raws.before || DEFAULT_RAWS_RULE.before,
          between: DEFAULT_RAWS_RULE.between
        },
        parent: parent,
        selector: (this.raws.customProperty ? '--' : '') + this.raws.multiRuleProp
      });
      parent.push(multiRule);
      parent = multiRule;
    }

    this.raws.before = '';

    // Looking for declaration node in block node
    node.content.forEach(function (contentNode) {
      return _this3.process(contentNode, parent);
    });
    if (this.raws.multiRule) {
      this.raws.beforeMulti = this.raws.before;
    }
  };

  SassParser.prototype.declaration = function declaration(node, parent) {
    var _this4 = this;

    var isBlockInside = false;
    // Create Declaration node
    var declarationNode = postcss.decl();
    declarationNode.prop = '';

    // Object to store raws for Declaration
    var declarationRaws = Object.assign(declarationNode.raws, {
      before: this.raws.before || DEFAULT_RAWS_DECL.before,
      between: DEFAULT_RAWS_DECL.between,
      semicolon: DEFAULT_RAWS_DECL.semicolon
    });

    this.raws.property = false;
    this.raws.betweenBefore = false;
    this.raws.comment = false;
    // Looking for property and value node in declaration node
    node.content.forEach(function (contentNode) {
      switch (contentNode.type) {
        case 'customProperty':
          _this4.raws.customProperty = true;
        // fall through
        case 'property':
          {
            /* this.raws.property to detect is property is already defined in current object */
            _this4.raws.property = true;
            _this4.raws.multiRuleProp = contentNode.content[0].content;
            _this4.raws.multiRulePropVariable = contentNode.content[0].type === 'variable';
            _this4.process(contentNode, declarationNode);
            break;
          }
        case 'propertyDelimiter':
          {
            if (_this4.raws.property && !_this4.raws.betweenBefore) {
              /* If property is already defined and there's no ':' before it */
              declarationRaws.between += contentNode.content;
              _this4.raws.multiRuleProp += contentNode.content;
            } else {
              /* If ':' goes before property declaration, like :width 100px */
              _this4.raws.betweenBefore = true;
              declarationRaws.before += contentNode.content;
              _this4.raws.multiRuleProp += contentNode.content;
            }
            break;
          }
        case 'space':
          {
            declarationRaws.between += contentNode.content;
            break;
          }
        case 'value':
          {
            // Look up for a value for current property
            switch (contentNode.content[0].type) {
              case 'block':
                {
                  isBlockInside = true;
                  // If nested rules exist
                  if (Array.isArray(contentNode.content[0].content)) {
                    _this4.raws.multiRule = true;
                  }
                  _this4.process(contentNode.content[0], parent);
                  break;
                }
              case 'variable':
                {
                  declarationNode.value = '$';
                  _this4.process(contentNode, declarationNode);
                  break;
                }
              case 'color':
                {
                  declarationNode.value = '#';
                  _this4.process(contentNode, declarationNode);
                  break;
                }
              case 'number':
                {
                  if (contentNode.content.length > 1) {
                    declarationNode.value = contentNode.content.join('');
                  } else {
                    _this4.process(contentNode, declarationNode);
                  }
                  break;
                }
              case 'parentheses':
                {
                  declarationNode.value = '(';
                  _this4.process(contentNode, declarationNode);
                  break;
                }
              default:
                {
                  _this4.process(contentNode, declarationNode);
                }
            }
            break;
          }
        default:
      }
    });

    if (!isBlockInside) {
      // Set parameters for Declaration node
      declarationNode.source = {
        start: node.start,
        end: node.end,
        input: this.input
      };
      declarationNode.parent = parent;
      parent.nodes.push(declarationNode);
    }

    this.raws.before = '';
    this.raws.customProperty = false;
    this.raws.multiRuleProp = '';
    this.raws.property = false;
  };

  SassParser.prototype.customProperty = function customProperty(node, parent) {
    this.property(node, parent);
    parent.prop = '--' + parent.prop;
  };

  SassParser.prototype.property = function property(node, parent) {
    // Set property for Declaration node
    switch (node.content[0].type) {
      case 'variable':
        {
          parent.prop += '$';
          break;
        }
      case 'interpolation':
        {
          this.raws.interpolation = true;
          parent.prop += '#{';
          break;
        }
      default:
    }
    parent.prop += node.content[0].content;
    if (this.raws.interpolation) {
      parent.prop += '}';
      this.raws.interpolation = false;
    }
  };

  SassParser.prototype.value = function value(node, parent) {
    if (!parent.value) {
      parent.value = '';
    }
    // Set value for Declaration node
    if (node.content.length) {
      node.content.forEach(function (contentNode) {
        switch (contentNode.type) {
          case 'important':
            {
              parent.raws.important = contentNode.content;
              parent.important = true;
              var match = parent.value.match(/^(.*?)(\s*)$/);
              if (match) {
                parent.raws.important = match[2] + parent.raws.important;
                parent.value = match[1];
              }
              break;
            }
          case 'parentheses':
            {
              parent.value += contentNode.content.join('') + ')';
              break;
            }
          case 'percentage':
            {
              parent.value += contentNode.content.join('') + '%';
              break;
            }
          default:
            {
              if (contentNode.content.constructor === Array) {
                parent.value += contentNode.content.join('');
              } else {
                parent.value += contentNode.content;
              }
            }
        }
      });
    }
  };

  SassParser.prototype.singlelineComment = function singlelineComment(node, parent) {
    return this.comment(node, parent, true);
  };

  SassParser.prototype.multilineComment = function multilineComment(node, parent) {
    return this.comment(node, parent, false);
  };

  SassParser.prototype.comment = function comment(node, parent, inline) {
    // https://github.com/nodesecurity/eslint-plugin-security#detect-unsafe-regex
    // eslint-disable-next-line security/detect-unsafe-regex
    var text = node.content.match(/^(\s*)((?:\S[\s\S]*?)?)(\s*)$/);

    this.raws.comment = true;

    var comment = Object.assign(postcss.comment(), {
      text: text[2],
      raws: {
        before: this.raws.before || DEFAULT_COMMENT_DECL.before,
        left: text[1],
        right: text[3],
        inline: inline
      }
    });

    if (this.raws.beforeMulti) {
      comment.raws.before += this.raws.beforeMulti;
      this.raws.beforeMulti = undefined;
    }

    parent.nodes.push(comment);
    this.raws.before = '';
  };

  SassParser.prototype.space = function space(node, parent) {
    // Spaces before root and rule
    switch (parent.type) {
      case 'root':
        {
          this.raws.before += node.content;
          break;
        }
      case 'rule':
        {
          if (this.raws.comment) {
            this.raws.before += node.content;
          } else if (this.raws.loop) {
            parent.selector += node.content;
          } else {
            this.raws.before = (this.raws.before || '\n') + node.content;
          }
          break;
        }
      default:
    }
  };

  SassParser.prototype.declarationDelimiter = function declarationDelimiter(node) {
    this.raws.before += node.content;
  };

  SassParser.prototype.loop = function loop(node, parent) {
    var _this5 = this;

    var loop = postcss.rule();
    this.raws.comment = false;
    this.raws.multiRule = false;
    this.raws.loop = true;
    loop.selector = '';
    loop.raws = {
      before: this.raws.before || DEFAULT_RAWS_RULE.before,
      between: DEFAULT_RAWS_RULE.between
    };
    if (this.raws.beforeMulti) {
      loop.raws.before += this.raws.beforeMulti;
      this.raws.beforeMulti = undefined;
    }
    node.content.forEach(function (contentNode, i) {
      if (node.content[i + 1] && node.content[i + 1].type === 'block') {
        _this5.raws.loop = false;
      }
      _this5.process(contentNode, loop);
    });
    parent.nodes.push(loop);
    this.raws.loop = false;
  };

  SassParser.prototype.atkeyword = function atkeyword(node, parent) {
    parent.selector += '@' + node.content;
  };

  SassParser.prototype.operator = function operator(node, parent) {
    parent.selector += node.content;
  };

  SassParser.prototype.variable = function variable(node, parent) {
    if (this.raws.loop) {
      parent.selector += '$' + node.content[0].content;
    } else {
      parent.selector += '#' + node.content[0].content;
    }
  };

  SassParser.prototype.ident = function ident(node, parent) {
    parent.selector += node.content;
  };

  return SassParser;
}();

module.exports = SassParser;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhcnNlci5lczYiXSwibmFtZXMiOlsicG9zdGNzcyIsInJlcXVpcmUiLCJnb256YWxlcyIsIkRFRkFVTFRfUkFXU19ST09UIiwiYmVmb3JlIiwiREVGQVVMVF9SQVdTX1JVTEUiLCJiZXR3ZWVuIiwiREVGQVVMVF9SQVdTX0RFQ0wiLCJzZW1pY29sb24iLCJERUZBVUxUX0NPTU1FTlRfREVDTCIsImxlZnQiLCJyaWdodCIsIlNhc3NQYXJzZXIiLCJpbnB1dCIsInBhcnNlIiwibm9kZSIsImNzcyIsInN5bnRheCIsImVycm9yIiwibWVzc2FnZSIsImxpbmUiLCJsaW5lcyIsIm1hdGNoIiwicm9vdCIsInN0eWxlc2hlZXQiLCJleHRyYWN0U291cmNlIiwic3RhcnQiLCJlbmQiLCJub2RlTGluZXMiLCJzbGljZSIsInN1YnN0cmluZyIsImNvbHVtbiIsImxhc3QiLCJsZW5ndGgiLCJqb2luIiwic291cmNlIiwicmF3cyIsImNvbnRlbnQiLCJmb3JFYWNoIiwicHJvY2VzcyIsImNvbnRlbnROb2RlIiwicGFyZW50IiwidHlwZSIsInJ1bGVzZXQiLCJtdWx0aVJ1bGVQcm9wIiwicnVsZSIsInNlbGVjdG9yIiwicnVsZVJhd3MiLCJjb21tZW50IiwiZmlsdGVyIiwiaW5uZXJDb250ZW50Tm9kZSIsIm5vZGVzIiwicmVwbGFjZSIsInNwYWNlcyIsInB1c2giLCJibG9jayIsIm11bHRpUnVsZSIsIm11bHRpUnVsZVByb3BWYXJpYWJsZSIsIk9iamVjdCIsImFzc2lnbiIsImN1c3RvbVByb3BlcnR5IiwiYmVmb3JlTXVsdGkiLCJkZWNsYXJhdGlvbiIsImlzQmxvY2tJbnNpZGUiLCJkZWNsYXJhdGlvbk5vZGUiLCJkZWNsIiwicHJvcCIsImRlY2xhcmF0aW9uUmF3cyIsInByb3BlcnR5IiwiYmV0d2VlbkJlZm9yZSIsIkFycmF5IiwiaXNBcnJheSIsInZhbHVlIiwiaW50ZXJwb2xhdGlvbiIsImltcG9ydGFudCIsImNvbnN0cnVjdG9yIiwic2luZ2xlbGluZUNvbW1lbnQiLCJtdWx0aWxpbmVDb21tZW50IiwiaW5saW5lIiwidGV4dCIsInVuZGVmaW5lZCIsInNwYWNlIiwibG9vcCIsImRlY2xhcmF0aW9uRGVsaW1pdGVyIiwiaSIsImF0a2V5d29yZCIsIm9wZXJhdG9yIiwidmFyaWFibGUiLCJpZGVudCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxJQUFNQSxVQUFVQyxRQUFRLFNBQVIsQ0FBaEI7QUFDQSxJQUFNQyxXQUFXRCxRQUFRLGFBQVIsQ0FBakI7O0FBRUEsSUFBTUUsb0JBQW9CO0FBQ3hCQyxVQUFRO0FBRGdCLENBQTFCOztBQUlBLElBQU1DLG9CQUFvQjtBQUN4QkQsVUFBUSxFQURnQjtBQUV4QkUsV0FBUztBQUZlLENBQTFCOztBQUtBLElBQU1DLG9CQUFvQjtBQUN4QkgsVUFBUSxFQURnQjtBQUV4QkUsV0FBUyxFQUZlO0FBR3hCRSxhQUFXO0FBSGEsQ0FBMUI7O0FBTUEsSUFBTUMsdUJBQXVCO0FBQzNCTCxVQUFRLEVBRG1CO0FBRTNCTSxRQUFNLEVBRnFCO0FBRzNCQyxTQUFPO0FBSG9CLENBQTdCOztJQU1NQyxVO0FBQ0osc0JBQWFDLEtBQWIsRUFBb0I7QUFBQTs7QUFDbEIsU0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0Q7O3VCQUNEQyxLLG9CQUFTO0FBQ1AsUUFBSTtBQUNGLFdBQUtDLElBQUwsR0FBWWIsU0FBU1ksS0FBVCxDQUFlLEtBQUtELEtBQUwsQ0FBV0csR0FBMUIsRUFBK0IsRUFBRUMsUUFBUSxNQUFWLEVBQS9CLENBQVo7QUFDRCxLQUZELENBRUUsT0FBT0MsS0FBUCxFQUFjO0FBQ2QsWUFBTSxLQUFLTCxLQUFMLENBQVdLLEtBQVgsQ0FBaUJBLE1BQU1DLE9BQXZCLEVBQWdDRCxNQUFNRSxJQUF0QyxFQUE0QyxDQUE1QyxDQUFOO0FBQ0Q7QUFDRCxTQUFLQyxLQUFMLEdBQWEsS0FBS1IsS0FBTCxDQUFXRyxHQUFYLENBQWVNLEtBQWYsQ0FBcUIsZ0JBQXJCLENBQWI7QUFDQSxTQUFLQyxJQUFMLEdB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LEtBQUtzQixPQUFMLENBQWEsQ0FBYixFQUFnQkEsT0FBeEM7QUFDRDtBQUNGLEc7O3VCQUNEbUQsSyxrQkFBT3pFLEksRUFBTTBCLE0sRUFBUTtBQUNuQkEsV0FBT0ssUUFBUCxJQUFtQi9CLEtBQUtzQixPQUF4QjtBQUNELEc7Ozs7O0FBR0hvRCxPQUFPQyxPQUFQLEdBQWlCOUUsVUFBakIiLCJmaWxlIjoicGFyc2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgcG9zdGNzcyA9IHJlcXVpcmUoJ3Bvc3Rjc3MnKVxuY29uc3QgZ29uemFsZXMgPSByZXF1aXJlKCdnb256YWxlcy1wZScpXG5cbmNvbnN0IERFRkFVTFRfUkFXU19ST09UID0ge1xuICBiZWZvcmU6ICcnXG59XG5cbmNvbnN0IERFRkFVTFRfUkFXU19SVUxFID0ge1xuICBiZWZvcmU6ICcnLFxuICBiZXR3ZWVuOiAnJ1xufVxuXG5jb25zdCBERUZBVUxUX1JBV1NfREVDTCA9IHtcbiAgYmVmb3JlOiAnJyxcbiAgYmV0d2VlbjogJycsXG4gIHNlbWljb2xvbjogZmFsc2Vcbn1cblxuY29uc3QgREVGQVVMVF9DT01NRU5UX0RFQ0wgPSB7XG4gIGJlZm9yZTogJycsXG4gIGxlZnQ6ICcnLFxuICByaWdodDogJydcbn1cblxuY2xhc3MgU2Fzc1BhcnNlciB7XG4gIGNvbnN0cnVjdG9yIChpbnB1dCkge1xuICAgIHRoaXMuaW5wdXQgPSBpbnB1dFxuICB9XG4gIHBhcnNlICgpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5ub2RlID0gZ29uemFsZXMucGFyc2UodGhpcy5pbnB1dC5jc3MsIHsgc3ludGF4OiAnc2FzcycgfSlcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgdGhpcy5pbnB1dC5lcnJvcihlcnJvci5tZXNzYWdlLCBlcnJvci5saW5lLCAxKVxuICAgIH1cbiAgICB0aGlzLmxpbmVzID0gdGhpcy5pbnB1dC5jc3MubWF0Y2goL14uKihcXHI/XFxufCQpL2dtKVxuICAgIHRoaXMucm9vdCA9IHRoaXMuc3R5bGVzaGVldCh0aGlzLm5vZGUpXG4gIH1cbiAgZXh0cmFjdFNvdXJjZSAoc3RhcnQsIGVuZCkge1xuICAgIGxldCBub2RlTGluZXMgPSB0aGlzLmxpbmVzLnNsaWNlKFxuICAgICAgc3RhcnQubGluZSAtIDEsXG4gICAgICBlbmQubGluZVxuICAgIClcblxuICAgIG5vZGVMaW5lc1swXSA9IG5vZGVMaW5lc1swXS5zdWJzdHJpbmcoc3RhcnQuY29sdW1uIC0gMSlcbiAgICBsZXQgbGFzdCA9IG5vZGVMaW5lcy5sZW5ndGggLSAxXG4gICAgbm9kZUxpbmVzW2xhc3RdID0gbm9kZUxpbmVzW2xhc3RdLnN1YnN0cmluZygwLCBlbmQuY29sdW1uKVxuXG4gICAgcmV0dXJuIG5vZGVMaW5lcy5qb2luKCcnKVxuICB9XG4gIHN0eWxlc2hlZXQgKG5vZGUpIHtcbiAgICAvLyBDcmVhdGUgYW5kIHNldCBwYXJhbWV0ZXJzIGZvciBSb290IG5vZGVcbiAgICBsZXQgcm9vdCA9IHBvc3Rjc3Mucm9vdCgpXG4gICAgcm9vdC5zb3VyY2UgPSB7XG4gICAgICBzdGFydDogbm9kZS5zdGFydCxcbiAgICAgIGVuZDogbm9kZS5lbmQsXG4gICAgICBpbnB1dDogdGhpcy5pbnB1dFxuICAgIH1cbiAgICAvLyBSYXdzIGZvciByb290IG5vZGVcbiAgICByb290LnJhd3MgPSB7XG4gICAgICBzZW1pY29sb246IERFRkFVTFRfUkFXU19ST09ULnNlbWljb2xvbixcbiAgICAgIGJlZm9yZTogREVGQVVMVF9SQVdTX1JPT1QuYmVmb3JlXG4gICAgfVxuICAgIC8vIFN0b3JlIHNwYWNlcyBiZWZvcmUgcm9vdCAoaWYgZXhpc3QpXG4gICAgdGhpcy5yYXdzID0ge1xuICAgICAgYmVmb3JlOiAnJ1xuICAgIH1cbiAgICBub2RlLmNvbnRlbnQuZm9yRWFjaChjb250ZW50Tm9kZSA9PiB0aGlzLnByb2Nlc3MoY29udGVudE5vZGUsIHJvb3QpKVxuICAgIHJldHVybiByb290XG4gIH1cbiAgcHJvY2VzcyAobm9kZSwgcGFyZW50KSB7XG4gICAgaWYgKHRoaXNbbm9kZS50eXBlXSkge1xuICAgICAgcmV0dXJuIHRoaXNbbm9kZS50eXBlXShub2RlLCBwYXJlbnQpIHx8IG51bGxcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gIH1cbiAgcnVsZXNldCAobm9kZSwgcGFyZW50KSB7XG4gICAgLy8gTG9vcCB0byBmaW5kIHRoZSBkZWVwZXN0IHJ1bGVzZXQgbm9kZVxuICAgIHRoaXMucmF3cy5tdWx0aVJ1bGVQcm9wID0gJydcblxuICAgIG5vZGUuY29udGVudC5mb3JFYWNoKGNvbnRlbnROb2RlID0+IHtcbiAgICAgIHN3aXRjaCAoY29udGVudE5vZGUudHlwZSkge1xuICAgICAgICBjYXNlICdibG9jayc6IHtcbiAgICAgICAgICAvLyBDcmVhdGUgUnVsZSBub2RlXG4gICAgICAgICAgbGV0IHJ1bGUgPSBwb3N0Y3NzLnJ1bGUoKVxuICAgICAgICAgIHJ1bGUuc2VsZWN0b3IgPSAnJ1xuICAgICAgICAgIC8vIE9iamVjdCB0byBzdG9yZSByYXdzIGZvciBSdWxlXG4gICAgICAgICAgbGV0IHJ1bGVSYXdzID0ge1xuICAgICAgICAgICAgYmVmb3JlOiB0aGlzLnJhd3MuYmVmb3JlIHx8IERFRkFVTFRfUkFXU19SVUxFLmJlZm9yZSxcbiAgICAgICAgICAgIGJldHdlZW46IERFRkFVTFRfUkFXU19SVUxFLmJldHdlZW5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBWYXJpYWJsZSB0byBzdG9yZSBzcGFjZXMgYW5kIHN5bWJvbHMgYmVmb3JlIGRlY2xhcmF0aW9uIHByb3BlcnR5XG4gICAgICAgICAgdGhpcy5yYXdzLmJlZm9yZSA9ICcnXG4gICAgICAgICAgdGhpcy5yYXdzLmNvbW1lbnQgPSBmYWxzZVxuXG4gICAgICAgICAgLy8gTG9vayB1cCB0aHJvdyBhbGwgbm9kZXMgaW4gY3VycmVudCBydWxlc2V0IG5vZGVcbiAgICAgICAgICBub2RlLmNvbnRlbnRcbiAgICAgICAgICAgIC5maWx0ZXIoY29udGVudCA9PiBjb250ZW50LnR5cGUgPT09ICdibG9jaycpXG4gICAgICAgICAgICAuZm9yRWFjaChpbm5lckNvbnRlbnROb2RlID0+IHRoaXMucHJvY2Vzcyhpbm5lckNvbnRlbnROb2RlLCBydWxlKSlcblxuICAgICAgICAgIGlmIChydWxlLm5vZGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgLy8gV3JpdGUgc2VsZWN0b3IgdG8gUnVsZVxuICAgICAgICAgICAgcnVsZS5zZWxlY3RvciA9IHRoaXMuZXh0cmFjdFNvdXJjZShcbiAgICAgICAgICAgICAgbm9kZS5zdGFydCxcbiAgICAgICAgICAgICAgY29udGVudE5vZGUuc3RhcnRcbiAgICAgICAgICAgICkuc2xpY2UoMCwgLTEpLnJlcGxhY2UoL1xccyskLywgc3BhY2VzID0+IHtcbiAgICAgICAgICAgICAgcnVsZVJhd3MuYmV0d2VlbiA9IHNwYWNlc1xuICAgICAgICAgICAgICByZXR1cm4gJydcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAvLyBTZXQgcGFyYW1ldGVycyBmb3IgUnVsZSBub2RlXG4gICAgICAgICAgICBydWxlLnBhcmVudCA9IHBhcmVudFxuICAgICAgICAgICAgcnVsZS5zb3VyY2UgPSB7XG4gICAgICAgICAgICAgIHN0YXJ0OiBub2RlLnN0YXJ0LFxuICAgICAgICAgICAgICBlbmQ6IG5vZGUuZW5kLFxuICAgICAgICAgICAgICBpbnB1dDogdGhpcy5pbnB1dFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcnVsZS5yYXdzID0gcnVsZVJhd3NcbiAgICAgICAgICAgIHBhcmVudC5ub2Rlcy5wdXNoKHJ1bGUpXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIGJsb2NrIChub2RlLCBwYXJlbnQpIHtcbiAgICAvLyBJZiBuZXN0ZWQgcnVsZXMgZXhpc3QsIHdyYXAgY3VycmVudCBydWxlIGluIG5ldyBydWxlIG5vZGVcbiAgICBpZiAodGhpcy5yYXdzLm11bHRpUnVsZSkge1xuICAgICAgaWYgKHRoaXMucmF3cy5tdWx0aVJ1bGVQcm9wVmFyaWFibGUpIHtcbiAgICAgICAgdGhpcy5yYXdzLm11bHRpUnVsZVByb3AgPSBgJCR7IHRoaXMucmF3cy5tdWx0aVJ1bGVQcm9wIH1gXG4gICAgICB9XG4gICAgICBsZXQgbXVsdGlSdWxlID0gT2JqZWN0LmFzc2lnbihwb3N0Y3NzLnJ1bGUoKSwge1xuICAgICAgICBzb3VyY2U6IHtcbiAgICAgICAgICBzdGFydDoge1xuICAgICAgICAgICAgbGluZTogbm9kZS5zdGFydC5saW5lIC0gMSxcbiAgICAgICAgICAgIGNvbHVtbjogbm9kZS5zdGFydC5jb2x1bW5cbiAgICAgICAgICB9LFxuICAgICAgICAgIGVuZDogbm9kZS5lbmQsXG4gICAgICAgICAgaW5wdXQ6IHRoaXMuaW5wdXRcbiAgICAgICAgfSxcbiAgICAgICAgcmF3czoge1xuICAgICAgICAgIGJlZm9yZTogdGhpcy5yYXdzLmJlZm9yZSB8fCBERUZBVUxUX1JBV1NfUlVMRS5iZWZvcmUsXG4gICAgICAgICAgYmV0d2VlbjogREVGQVVMVF9SQVdTX1JVTEUuYmV0d2VlblxuICAgICAgICB9LFxuICAgICAgICBwYXJlbnQsXG4gICAgICAgIHNlbGVjdG9yOiAodGhpcy5yYXdzLmN1c3RvbVByb3BlcnR5ID8gJy0tJyA6ICcnKSArIHRoaXMucmF3cy5tdWx0aVJ1bGVQcm9wXG4gICAgICB9KVxuICAgICAgcGFyZW50LnB1c2gobXVsdGlSdWxlKVxuICAgICAgcGFyZW50ID0gbXVsdGlSdWxlXG4gICAgfVxuXG4gICAgdGhpcy5yYXdzLmJlZm9yZSA9ICcnXG5cbiAgICAvLyBMb29raW5nIGZvciBkZWNsYXJhdGlvbiBub2RlIGluIGJsb2NrIG5vZGVcbiAgICBub2RlLmNvbnRlbnQuZm9yRWFjaChjb250ZW50Tm9kZSA9PiB0aGlzLnByb2Nlc3MoY29udGVudE5vZGUsIHBhcmVudCkpXG4gICAgaWYgKHRoaXMucmF3cy5tdWx0aVJ1bGUpIHtcbiAgICAgIHRoaXMucmF3cy5iZWZvcmVNdWx0aSA9IHRoaXMucmF3cy5iZWZvcmVcbiAgICB9XG4gIH1cbiAgZGVjbGFyYXRpb24gKG5vZGUsIHBhcmVudCkge1xuICAgIGxldCBpc0Jsb2NrSW5zaWRlID0gZmFsc2VcbiAgICAvLyBDcmVhdGUgRGVjbGFyYXRpb24gbm9kZVxuICAgIGxldCBkZWNsYXJhdGlvbk5vZGUgPSBwb3N0Y3NzLmRlY2woKVxuICAgIGRlY2xhcmF0aW9uTm9kZS5wcm9wID0gJydcblxuICAgIC8vIE9iamVjdCB0byBzdG9yZSByYXdzIGZvciBEZWNsYXJhdGlvblxuICAgIGxldCBkZWNsYXJhdGlvblJhd3MgPSBPYmplY3QuYXNzaWduKGRlY2xhcmF0aW9uTm9kZS5yYXdzLCB7XG4gICAgICBiZWZvcmU6IHRoaXMucmF3cy5iZWZvcmUgfHwgREVGQVVMVF9SQVdTX0RFQ0wuYmVmb3JlLFxuICAgICAgYmV0d2VlbjogREVGQVVMVF9SQVdTX0RFQ0wuYmV0d2VlbixcbiAgICAgIHNlbWljb2xvbjogREVGQVVMVF9SQVdTX0RFQ0wuc2VtaWNvbG9uXG4gICAgfSlcblxuICAgIHRoaXMucmF3cy5wcm9wZXJ0eSA9IGZhbHNlXG4gICAgdGhpcy5yYXdzLmJldHdlZW5CZWZvcmUgPSBmYWxzZVxuICAgIHRoaXMucmF3cy5jb21tZW50ID0gZmFsc2VcbiAgICAvLyBMb29raW5nIGZvciBwcm9wZXJ0eSBhbmQgdmFsdWUgbm9kZSBpbiBkZWNsYXJhdGlvbiBub2RlXG4gICAgbm9kZS5jb250ZW50LmZvckVhY2goY29udGVudE5vZGUgPT4ge1xuICAgICAgc3dpdGNoIChjb250ZW50Tm9kZS50eXBlKSB7XG4gICAgICAgIGNhc2UgJ2N1c3RvbVByb3BlcnR5JzpcbiAgICAgICAgICB0aGlzLnJhd3MuY3VzdG9tUHJvcGVydHkgPSB0cnVlXG4gICAgICAgICAgLy8gZmFsbCB0aHJvdWdoXG4gICAgICAgIGNhc2UgJ3Byb3BlcnR5Jzoge1xuICAgICAgICAgIC8qIHRoaXMucmF3cy5wcm9wZXJ0eSB0byBkZXRlY3QgaXMgcHJvcGVydHkgaXMgYWxyZWFkeSBkZWZpbmVkIGluIGN1cnJlbnQgb2JqZWN0ICovXG4gICAgICAgICAgdGhpcy5yYXdzLnByb3BlcnR5ID0gdHJ1ZVxuICAgICAgICAgIHRoaXMucmF3cy5tdWx0aVJ1bGVQcm9wID0gY29udGVudE5vZGUuY29udGVudFswXS5jb250ZW50XG4gICAgICAgICAgdGhpcy5yYXdzLm11bHRpUnVsZVByb3BWYXJpYWJsZSA9IGNvbnRlbnROb2RlLmNvbnRlbnRbMF0udHlwZSA9PT0gJ3ZhcmlhYmxlJ1xuICAgICAgICAgIHRoaXMucHJvY2Vzcyhjb250ZW50Tm9kZSwgZGVjbGFyYXRpb25Ob2RlKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAncHJvcGVydHlEZWxpbWl0ZXInOiB7XG4gICAgICAgICAgaWYgKHRoaXMucmF3cy5wcm9wZXJ0eSAmJiAhdGhpcy5yYXdzLmJldHdlZW5CZWZvcmUpIHtcbiAgICAgICAgICAgIC8qIElmIHByb3BlcnR5IGlzIGFscmVhZHkgZGVmaW5lZCBhbmQgdGhlcmUncyBubyAnOicgYmVmb3JlIGl0ICovXG4gICAgICAgICAgICBkZWNsYXJhdGlvblJhd3MuYmV0d2VlbiArPSBjb250ZW50Tm9kZS5jb250ZW50XG4gICAgICAgICAgICB0aGlzLnJhd3MubXVsdGlSdWxlUHJvcCArPSBjb250ZW50Tm9kZS5jb250ZW50XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8qIElmICc6JyBnb2VzIGJlZm9yZSBwcm9wZXJ0eSBkZWNsYXJhdGlvbiwgbGlrZSA6d2lkdGggMTAwcHggKi9cbiAgICAgICAgICAgIHRoaXMucmF3cy5iZXR3ZWVuQmVmb3JlID0gdHJ1ZVxuICAgICAgICAgICAgZGVjbGFyYXRpb25SYXdzLmJlZm9yZSArPSBjb250ZW50Tm9kZS5jb250ZW50XG4gICAgICAgICAgICB0aGlzLnJhd3MubXVsdGlSdWxlUHJvcCArPSBjb250ZW50Tm9kZS5jb250ZW50XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnc3BhY2UnOiB7XG4gICAgICAgICAgZGVjbGFyYXRpb25SYXdzLmJldHdlZW4gKz0gY29udGVudE5vZGUuY29udGVudFxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAndmFsdWUnOiB7XG4gICAgICAgICAgLy8gTG9vayB1cCBmb3IgYSB2YWx1ZSBmb3IgY3VycmVudCBwcm9wZXJ0eVxuICAgICAgICAgIHN3aXRjaCAoY29udGVudE5vZGUuY29udGVudFswXS50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdibG9jayc6IHtcbiAgICAgICAgICAgICAgaXNCbG9ja0luc2lkZSA9IHRydWVcbiAgICAgICAgICAgICAgLy8gSWYgbmVzdGVkIHJ1bGVzIGV4aXN0XG4gICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNvbnRlbnROb2RlLmNvbnRlbnRbMF0uY29udGVudCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJhd3MubXVsdGlSdWxlID0gdHJ1ZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMucHJvY2Vzcyhjb250ZW50Tm9kZS5jb250ZW50WzBdLCBwYXJlbnQpXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICd2YXJpYWJsZSc6IHtcbiAgICAgICAgICAgICAgZGVjbGFyYXRpb25Ob2RlLnZhbHVlID0gJyQnXG4gICAgICAgICAgICAgIHRoaXMucHJvY2Vzcyhjb250ZW50Tm9kZSwgZGVjbGFyYXRpb25Ob2RlKVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAnY29sb3InOiB7XG4gICAgICAgICAgICAgIGRlY2xhcmF0aW9uTm9kZS52YWx1ZSA9ICcjJ1xuICAgICAgICAgICAgICB0aGlzLnByb2Nlc3MoY29udGVudE5vZGUsIGRlY2xhcmF0aW9uTm9kZSlcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ251bWJlcic6IHtcbiAgICAgICAgICAgICAgaWYgKGNvbnRlbnROb2RlLmNvbnRlbnQubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIGRlY2xhcmF0aW9uTm9kZS52YWx1ZSA9IGNvbnRlbnROb2RlLmNvbnRlbnQuam9pbignJylcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3MoY29udGVudE5vZGUsIGRlY2xhcmF0aW9uTm9kZSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAncGFyZW50aGVzZXMnOiB7XG4gICAgICAgICAgICAgIGRlY2xhcmF0aW9uTm9kZS52YWx1ZSA9ICcoJ1xuICAgICAgICAgICAgICB0aGlzLnByb2Nlc3MoY29udGVudE5vZGUsIGRlY2xhcmF0aW9uTm9kZSlcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzKGNvbnRlbnROb2RlLCBkZWNsYXJhdGlvbk5vZGUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgaWYgKCFpc0Jsb2NrSW5zaWRlKSB7XG4gICAgICAvLyBTZXQgcGFyYW1ldGVycyBmb3IgRGVjbGFyYXRpb24gbm9kZVxuICAgICAgZGVjbGFyYXRpb25Ob2RlLnNvdXJjZSA9IHtcbiAgICAgICAgc3RhcnQ6IG5vZGUuc3RhcnQsXG4gICAgICAgIGVuZDogbm9kZS5lbmQsXG4gICAgICAgIGlucHV0OiB0aGlzLmlucHV0XG4gICAgICB9XG4gICAgICBkZWNsYXJhdGlvbk5vZGUucGFyZW50ID0gcGFyZW50XG4gICAgICBwYXJlbnQubm9kZXMucHVzaChkZWNsYXJhdGlvbk5vZGUpXG4gICAgfVxuXG4gICAgdGhpcy5yYXdzLmJlZm9yZSA9ICcnXG4gICAgdGhpcy5yYXdzLmN1c3RvbVByb3BlcnR5ID0gZmFsc2VcbiAgICB0aGlzLnJhd3MubXVsdGlSdWxlUHJvcCA9ICcnXG4gICAgdGhpcy5yYXdzLnByb3BlcnR5ID0gZmFsc2VcbiAgfVxuICBjdXN0b21Qcm9wZXJ0eSAobm9kZSwgcGFyZW50KSB7XG4gICAgdGhpcy5wcm9wZXJ0eShub2RlLCBwYXJlbnQpXG4gICAgcGFyZW50LnByb3AgPSBgLS0keyBwYXJlbnQucHJvcCB9YFxuICB9XG4gIHByb3BlcnR5IChub2RlLCBwYXJlbnQpIHtcbiAgICAvLyBTZXQgcHJvcGVydHkgZm9yIERlY2xhcmF0aW9uIG5vZGVcbiAgICBzd2l0Y2ggKG5vZGUuY29udGVudFswXS50eXBlKSB7XG4gICAgICBjYXNlICd2YXJpYWJsZSc6IHtcbiAgICAgICAgcGFyZW50LnByb3AgKz0gJyQnXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBjYXNlICdpbnRlcnBvbGF0aW9uJzoge1xuICAgICAgICB0aGlzLnJhd3MuaW50ZXJwb2xhdGlvbiA9IHRydWVcbiAgICAgICAgcGFyZW50LnByb3AgKz0gJyN7J1xuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICB9XG4gICAgcGFyZW50LnByb3AgKz0gbm9kZS5jb250ZW50WzBdLmNvbnRlbnRcbiAgICBpZiAodGhpcy5yYXdzLmludGVycG9sYXRpb24pIHtcbiAgICAgIHBhcmVudC5wcm9wICs9ICd9J1xuICAgICAgdGhpcy5yYXdzLmludGVycG9sYXRpb24gPSBmYWxzZVxuICAgIH1cbiAgfVxuICB2YWx1ZSAobm9kZSwgcGFyZW50KSB7XG4gICAgaWYgKCFwYXJlbnQudmFsdWUpIHtcbiAgICAgIHBhcmVudC52YWx1ZSA9ICcnXG4gICAgfVxuICAgIC8vIFNldCB2YWx1ZSBmb3IgRGVjbGFyYXRpb24gbm9kZVxuICAgIGlmIChub2RlLmNvbnRlbnQubGVuZ3RoKSB7XG4gICAgICBub2RlLmNvbnRlbnQuZm9yRWFjaChjb250ZW50Tm9kZSA9PiB7XG4gICAgICAgIHN3aXRjaCAoY29udGVudE5vZGUudHlwZSkge1xuICAgICAgICAgIGNhc2UgJ2ltcG9ydGFudCc6IHtcbiAgICAgICAgICAgIHBhcmVudC5yYXdzLmltcG9ydGFudCA9IGNvbnRlbnROb2RlLmNvbnRlbnRcbiAgICAgICAgICAgIHBhcmVudC5pbXBvcnRhbnQgPSB0cnVlXG4gICAgICAgICAgICBsZXQgbWF0Y2ggPSBwYXJlbnQudmFsdWUubWF0Y2goL14oLio/KShcXHMqKSQvKVxuICAgICAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICAgIHBhcmVudC5yYXdzLmltcG9ydGFudCA9IG1hdGNoWzJdICsgcGFyZW50LnJhd3MuaW1wb3J0YW50XG4gICAgICAgICAgICAgIHBhcmVudC52YWx1ZSA9IG1hdGNoWzFdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXNlICdwYXJlbnRoZXNlcyc6IHtcbiAgICAgICAgICAgIHBhcmVudC52YWx1ZSArPSBjb250ZW50Tm9kZS5jb250ZW50LmpvaW4oJycpICsgJyknXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXNlICdwZXJjZW50YWdlJzoge1xuICAgICAgICAgICAgcGFyZW50LnZhbHVlICs9IGNvbnRlbnROb2RlLmNvbnRlbnQuam9pbignJykgKyAnJSdcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgIGlmIChjb250ZW50Tm9kZS5jb250ZW50LmNvbnN0cnVjdG9yID09PSBBcnJheSkge1xuICAgICAgICAgICAgICBwYXJlbnQudmFsdWUgKz0gY29udGVudE5vZGUuY29udGVudC5qb2luKCcnKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcGFyZW50LnZhbHVlICs9IGNvbnRlbnROb2RlLmNvbnRlbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG4gIHNpbmdsZWxpbmVDb21tZW50IChub2RlLCBwYXJlbnQpIHtcbiAgICByZXR1cm4gdGhpcy5jb21tZW50KG5vZGUsIHBhcmVudCwgdHJ1ZSlcbiAgfVxuICBtdWx0aWxpbmVDb21tZW50IChub2RlLCBwYXJlbnQpIHtcbiAgICByZXR1cm4gdGhpcy5jb21tZW50KG5vZGUsIHBhcmVudCwgZmFsc2UpXG4gIH1cbiAgY29tbWVudCAobm9kZSwgcGFyZW50LCBpbmxpbmUpIHtcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbm9kZXNlY3VyaXR5L2VzbGludC1wbHVnaW4tc2VjdXJpdHkjZGV0ZWN0LXVuc2FmZS1yZWdleFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBzZWN1cml0eS9kZXRlY3QtdW5zYWZlLXJlZ2V4XG4gICAgbGV0IHRleHQgPSBub2RlLmNvbnRlbnQubWF0Y2goL14oXFxzKikoKD86XFxTW1xcc1xcU10qPyk/KShcXHMqKSQvKVxuXG4gICAgdGhpcy5yYXdzLmNvbW1lbnQgPSB0cnVlXG5cbiAgICBsZXQgY29tbWVudCA9IE9iamVjdC5hc3NpZ24ocG9zdGNzcy5jb21tZW50KCksIHtcbiAgICAgIHRleHQ6IHRleHRbMl0sXG4gICAgICByYXdzOiB7XG4gICAgICAgIGJlZm9yZTogdGhpcy5yYXdzLmJlZm9yZSB8fCBERUZBVUxUX0NPTU1FTlRfREVDTC5iZWZvcmUsXG4gICAgICAgIGxlZnQ6IHRleHRbMV0sXG4gICAgICAgIHJpZ2h0OiB0ZXh0WzNdLFxuICAgICAgICBpbmxpbmVcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgaWYgKHRoaXMucmF3cy5iZWZvcmVNdWx0aSkge1xuICAgICAgY29tbWVudC5yYXdzLmJlZm9yZSArPSB0aGlzLnJhd3MuYmVmb3JlTXVsdGlcbiAgICAgIHRoaXMucmF3cy5iZWZvcmVNdWx0aSA9IHVuZGVmaW5lZFxuICAgIH1cblxuICAgIHBhcmVudC5ub2Rlcy5wdXNoKGNvbW1lbnQpXG4gICAgdGhpcy5yYXdzLmJlZm9yZSA9ICcnXG4gIH1cbiAgc3BhY2UgKG5vZGUsIHBhcmVudCkge1xuICAgIC8vIFNwYWNlcyBiZWZvcmUgcm9vdCBhbmQgcnVsZVxuICAgIHN3aXRjaCAocGFyZW50LnR5cGUpIHtcbiAgICAgIGNhc2UgJ3Jvb3QnOiB7XG4gICAgICAgIHRoaXMucmF3cy5iZWZvcmUgKz0gbm9kZS5jb250ZW50XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBjYXNlICdydWxlJzoge1xuICAgICAgICBpZiAodGhpcy5yYXdzLmNvbW1lbnQpIHtcbiAgICAgICAgICB0aGlzLnJhd3MuYmVmb3JlICs9IG5vZGUuY29udGVudFxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucmF3cy5sb29wKSB7XG4gICAgICAgICAgcGFyZW50LnNlbGVjdG9yICs9IG5vZGUuY29udGVudFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucmF3cy5iZWZvcmUgPSAodGhpcy5yYXdzLmJlZm9yZSB8fCAnXFxuJykgKyBub2RlLmNvbnRlbnRcbiAgICAgICAgfVxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICB9XG4gIH1cbiAgZGVjbGFyYXRpb25EZWxpbWl0ZXIgKG5vZGUpIHtcbiAgICB0aGlzLnJhd3MuYmVmb3JlICs9IG5vZGUuY29udGVudFxuICB9XG4gIGxvb3AgKG5vZGUsIHBhcmVudCkge1xuICAgIGxldCBsb29wID0gcG9zdGNzcy5ydWxlKClcbiAgICB0aGlzLnJhd3MuY29tbWVudCA9IGZhbHNlXG4gICAgdGhpcy5yYXdzLm11bHRpUnVsZSA9IGZhbHNlXG4gICAgdGhpcy5yYXdzLmxvb3AgPSB0cnVlXG4gICAgbG9vcC5zZWxlY3RvciA9ICcnXG4gICAgbG9vcC5yYXdzID0ge1xuICAgICAgYmVmb3JlOiB0aGlzLnJhd3MuYmVmb3JlIHx8IERFRkFVTFRfUkFXU19SVUxFLmJlZm9yZSxcbiAgICAgIGJldHdlZW46IERFRkFVTFRfUkFXU19SVUxFLmJldHdlZW5cbiAgICB9XG4gICAgaWYgKHRoaXMucmF3cy5iZWZvcmVNdWx0aSkge1xuICAgICAgbG9vcC5yYXdzLmJlZm9yZSArPSB0aGlzLnJhd3MuYmVmb3JlTXVsdGlcbiAgICAgIHRoaXMucmF3cy5iZWZvcmVNdWx0aSA9IHVuZGVmaW5lZFxuICAgIH1cbiAgICBub2RlLmNvbnRlbnQuZm9yRWFjaCgoY29udGVudE5vZGUsIGkpID0+IHtcbiAgICAgIGlmIChub2RlLmNvbnRlbnRbaSArIDFdICYmIG5vZGUuY29udGVudFtpICsgMV0udHlwZSA9PT0gJ2Jsb2NrJykge1xuICAgICAgICB0aGlzLnJhd3MubG9vcCA9IGZhbHNlXG4gICAgICB9XG4gICAgICB0aGlzLnByb2Nlc3MoY29udGVudE5vZGUsIGxvb3ApXG4gICAgfSlcbiAgICBwYXJlbnQubm9kZXMucHVzaChsb29wKVxuICAgIHRoaXMucmF3cy5sb29wID0gZmFsc2VcbiAgfVxuICBhdGtleXdvcmQgKG5vZGUsIHBhcmVudCkge1xuICAgIHBhcmVudC5zZWxlY3RvciArPSBgQCR7IG5vZGUuY29udGVudCB9YFxuICB9XG4gIG9wZXJhdG9yIChub2RlLCBwYXJlbnQpIHtcbiAgICBwYXJlbnQuc2VsZWN0b3IgKz0gbm9kZS5jb250ZW50XG4gIH1cbiAgdmFyaWFibGUgKG5vZGUsIHBhcmVudCkge1xuICAgIGlmICh0aGlzLnJhd3MubG9vcCkge1xuICAgICAgcGFyZW50LnNlbGVjdG9yICs9IGAkJHsgbm9kZS5jb250ZW50WzBdLmNvbnRlbnQgfWBcbiAgICB9IGVsc2Uge1xuICAgICAgcGFyZW50LnNlbGVjdG9yICs9IGAjJHsgbm9kZS5jb250ZW50WzBdLmNvbnRlbnQgfWBcbiAgICB9XG4gIH1cbiAgaWRlbnQgKG5vZGUsIHBhcmVudCkge1xuICAgIHBhcmVudC5zZWxlY3RvciArPSBub2RlLmNvbnRlbnRcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNhc3NQYXJzZXJcbiJdfQ==