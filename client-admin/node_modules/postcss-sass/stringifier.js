'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stringifier = require('postcss/lib/stringifier');

module.exports = function (_Stringifier) {
  _inherits(SassStringifier, _Stringifier);

  function SassStringifier() {
    _classCallCheck(this, SassStringifier);

    return _possibleConstructorReturn(this, _Stringifier.apply(this, arguments));
  }

  SassStringifier.prototype.block = function block(node, start) {
    this.builder(start, node, 'start');
    if (node.nodes && node.nodes.length) {
      this.body(node);
    }
  };

  SassStringifier.prototype.decl = function decl(node) {
    _Stringifier.prototype.decl.call(this, node, false);
  };

  SassStringifier.prototype.comment = function comment(node) {
    var left = this.raw(node, 'left', 'commentLeft');
    var right = this.raw(node, 'right', 'commentRight');

    if (node.raws.inline) {
      this.builder('//' + left + node.text + right, node);
    } else {
      this.builder('/*' + left + node.text + right + '*/', node);
    }
  };

  return SassStringifier;
}(Stringifier);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0cmluZ2lmaWVyLmVzNiJdLCJuYW1lcyI6WyJTdHJpbmdpZmllciIsInJlcXVpcmUiLCJtb2R1bGUiLCJleHBvcnRzIiwiYmxvY2siLCJub2RlIiwic3RhcnQiLCJidWlsZGVyIiwibm9kZXMiLCJsZW5ndGgiLCJib2R5IiwiZGVjbCIsImNvbW1lbnQiLCJsZWZ0IiwicmF3IiwicmlnaHQiLCJyYXdzIiwiaW5saW5lIiwidGV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxJQUFNQSxjQUFjQyxRQUFRLHlCQUFSLENBQXBCOztBQUVBQyxPQUFPQyxPQUFQO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBLDRCQUNFQyxLQURGLGtCQUNTQyxJQURULEVBQ2VDLEtBRGYsRUFDc0I7QUFDbEIsU0FBS0MsT0FBTCxDQUFhRCxLQUFiLEVBQW9CRCxJQUFwQixFQUEwQixPQUExQjtBQUNBLFFBQUlBLEtBQUtHLEtBQUwsSUFBY0gsS0FBS0csS0FBTCxDQUFXQyxNQUE3QixFQUFxQztBQUNuQyxXQUFLQyxJQUFMLENBQVVMLElBQVY7QUFDRDtBQUNGLEdBTkg7O0FBQUEsNEJBUUVNLElBUkYsaUJBUVFOLElBUlIsRUFRYztBQUNWLDJCQUFNTSxJQUFOLFlBQVdOLElBQVgsRUFBaUIsS0FBakI7QUFDRCxHQVZIOztBQUFBLDRCQVlFTyxPQVpGLG9CQVlXUCxJQVpYLEVBWWlCO0FBQ2IsUUFBSVEsT0FBTyxLQUFLQyxHQUFMLENBQVNULElBQVQsRUFBZSxNQUFmLEVBQXVCLGFBQXZCLENBQVg7QUFDQSxRQUFJVSxRQUFRLEtBQUtELEdBQUwsQ0FBU1QsSUFBVCxFQUFlLE9BQWYsRUFBd0IsY0FBeEIsQ0FBWjs7QUFFQSxRQUFJQSxLQUFLVyxJQUFMLENBQVVDLE1BQWQsRUFBc0I7QUFDcEIsV0FBS1YsT0FBTCxDQUFhLE9BQU9NLElBQVAsR0FBY1IsS0FBS2EsSUFBbkIsR0FBMEJILEtBQXZDLEVBQThDVixJQUE5QztBQUNELEtBRkQsTUFFTztBQUNMLFdBQUtFLE9BQUwsQ0FBYSxPQUFPTSxJQUFQLEdBQWNSLEtBQUthLElBQW5CLEdBQTBCSCxLQUExQixHQUFrQyxJQUEvQyxFQUFxRFYsSUFBckQ7QUFDRDtBQUNGLEdBckJIOztBQUFBO0FBQUEsRUFBK0NMLFdBQS9DIiwiZmlsZSI6InN0cmluZ2lmaWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgU3RyaW5naWZpZXIgPSByZXF1aXJlKCdwb3N0Y3NzL2xpYi9zdHJpbmdpZmllcicpXG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgU2Fzc1N0cmluZ2lmaWVyIGV4dGVuZHMgU3RyaW5naWZpZXIge1xuICBibG9jayAobm9kZSwgc3RhcnQpIHtcbiAgICB0aGlzLmJ1aWxkZXIoc3RhcnQsIG5vZGUsICdzdGFydCcpXG4gICAgaWYgKG5vZGUubm9kZXMgJiYgbm9kZS5ub2Rlcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuYm9keShub2RlKVxuICAgIH1cbiAgfVxuXG4gIGRlY2wgKG5vZGUpIHtcbiAgICBzdXBlci5kZWNsKG5vZGUsIGZhbHNlKVxuICB9XG5cbiAgY29tbWVudCAobm9kZSkge1xuICAgIGxldCBsZWZ0ID0gdGhpcy5yYXcobm9kZSwgJ2xlZnQnLCAnY29tbWVudExlZnQnKVxuICAgIGxldCByaWdodCA9IHRoaXMucmF3KG5vZGUsICdyaWdodCcsICdjb21tZW50UmlnaHQnKVxuXG4gICAgaWYgKG5vZGUucmF3cy5pbmxpbmUpIHtcbiAgICAgIHRoaXMuYnVpbGRlcignLy8nICsgbGVmdCArIG5vZGUudGV4dCArIHJpZ2h0LCBub2RlKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJ1aWxkZXIoJy8qJyArIGxlZnQgKyBub2RlLnRleHQgKyByaWdodCArICcqLycsIG5vZGUpXG4gICAgfVxuICB9XG59XG4iXX0=