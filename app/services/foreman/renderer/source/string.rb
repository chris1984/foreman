module Foreman
  module Renderer
    module Source
      class String < Foreman::Renderer::Source::Base
        def initialize(content:, name: 'Unnamed')
          @name = name
          @content = content
        end

        def find_snippet(name)
          nil
        end

        attr_reader :name, :content
      end
    end
  end
end
