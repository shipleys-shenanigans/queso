class QuesoController < ApplicationController
  def disasm
    input = params[:description]
    optimizations = params[:optimizations]
   
    begin
      compile_options_h = {}
      compile_options_a = optimizations.split(',').each do |op|
        op_name, is_on = op.split(':')
        compile_options_h[op_name.to_sym] = is_on == 'true'
      end
  
      RubyVM::InstructionSequence.compile_option = compile_options_h
      insns = RubyVM::InstructionSequence.compile(input).disasm
      some_text = {
        success: true,
        disasmText: insns
      }
      render :json => some_text
    rescue Exception => ex
      some_text = {
        success: false,
        disasmText: ex
      }
      render :json => some_text
    end
  end

  def version
    some_text = {
      version: RUBY_VERSION
    }
    render :json => some_text
  end
end
